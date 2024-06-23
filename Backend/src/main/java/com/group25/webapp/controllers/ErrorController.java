package com.group25.webapp.controllers;

import com.group25.webapp.util.JSON;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.autoconfigure.web.servlet.error.AbstractErrorController;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ErrorController extends AbstractErrorController {

    public ErrorController(ErrorAttributes errorAttributes) {
        super(errorAttributes);
    }

    @RequestMapping(value = "/error")
    public String handleError(HttpServletRequest request) {
        return JSON.toJson(super.getErrorAttributes(request, ErrorAttributeOptions.defaults().including(ErrorAttributeOptions.Include.MESSAGE)));
    }

}
