package com.medbtissam.gestiondestock.security.authorization;

import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.TokenRepository;
import com.medbtissam.gestiondestock.repositories.UtilisateurRepository;
import com.medbtissam.gestiondestock.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private final JwtUtils jwtUtil;

    private final UtilisateurRepository userRepository;

    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain filterChain)
            throws ServletException, IOException
    {
        String authHeader = request.getHeader(AUTHORIZATION);
        String userEmail;
        String jwt;

        /* on impose pour chaque requête il faut une nouveau authentification
         * ajouter un token dans postman même l'user est déja authentifié
         * SecurityContextHolder.getContext().setAuthentication(null);
         * mais c'est le role de SessionCreationPolicy.STATELESS dans SecurityConfig
         */
        if(authHeader == null || !authHeader.startsWith(BEARER)){
            filterChain.doFilter(request,response);
            return;
        }

        jwt = authHeader.substring(7);
        userEmail = jwtUtil.extractUsername(jwt);

        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null/* ça veut dire qu'il n'est pas authentifié*/)
        {
            UserDetails userDetails = userRepository.findUtilisateurByEmail(userEmail).orElseThrow(
                    ()-> new EntityNotFoundException("User not found while validation JWT")
            );

            /*
            var isTokenValid = tokenRepository.findByToken(jwt)
                    .map( token -> !token.isExpired() && !token.isInvoked() )
                    .orElse(false);
            */
            if(jwtUtil.isTokenValid(jwt, userDetails) /* && isTokenValid */){
                UsernamePasswordAuthenticationToken authenticationToken =new UsernamePasswordAuthenticationToken(
                        userDetails , null ,userDetails.getAuthorities()
                );
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request,response);
    }
}
