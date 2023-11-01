package com.medbtissam.gestiondestock.controllers.api;


import com.flickr4java.flickr.FlickrException;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Tag(name = "photo")
@RequestMapping("/photos")
public interface PhotoApi {

    @PostMapping(value = "/save/{id}/{title}/{context}" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Object savePhoto(
            @PathVariable("context") String context,
            @PathVariable("id") Integer id,
            @RequestPart("file") MultipartFile photo,
            @PathVariable("title") String title
    ) throws IOException,
            FlickrException;

}