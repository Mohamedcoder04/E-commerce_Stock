package com.medbtissam.gestiondestock.configuration;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.auth.Auth;
import com.github.scribejava.apis.FlickrApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.oauth.OAuth10aService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.util.Scanner;
import java.util.concurrent.ExecutionException;

//@Configuration
public class FlickrConfiguration {
    @Value("${flickr.apiKey}") //il va injecter la valeur qu'on a dans application.yaml
    private String apiKey;
    @Value("${flickr.apiSecret}")
    private String apiSecret;

    @Bean
    public Flickr getFlickr() throws InterruptedException, ExecutionException, IOException, FlickrException {
        Flickr flickr = new Flickr(apiKey,apiSecret,new REST());

        OAuth10aService service = new ServiceBuilder(apiKey)
                .apiSecret(apiSecret)
                //.build(FlickrApi.instance(FlickrApi.FlickrPerm.WRITE)); //WRITE nous donne que : READ, WRITE
                .build(FlickrApi.instance(FlickrApi.FlickrPerm.DELETE)); //delete nous donne les droits possible : READ, WRITE ET DELETE

        final Scanner scanner = new Scanner(System.in);//pour récupérer l'autohrisation que sera fourni par flickr pour activer ou génèrer le appKey et appSecret

        final OAuth1RequestToken requestToken = service.getRequestToken(); //génèrer l'exception
        final String authUrl = service.getAuthorizationUrl(requestToken); // ce sera l'url qui va nous permettre d'autoriser notre app à utiliser l'API
        System.out.println(authUrl);
        System.out.println("PASTE IT HERE >>>> ");
        String authVerifier = scanner.nextLine(); //on va récupérer l'auth

        OAuth1AccessToken accessToken = service.getAccessToken(requestToken, authVerifier);
        System.out.println(accessToken.getToken());
        System.out.println(accessToken.getTokenSecret());

        // on va vérifier que le token qu'on a récupéré est valide
        Auth auth = flickr.getAuthInterface().checkToken(accessToken); //génèrer l'exception

        System.out.println("----------------------------------------");
        System.out.println(auth.getToken());
        System.out.println(auth.getTokenSecret());

        return flickr;
    }
}
