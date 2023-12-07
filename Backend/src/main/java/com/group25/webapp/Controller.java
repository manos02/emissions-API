package com.group25.webapp;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class Controller {

    @GetMapping("/")
    public void index() {

    }

}
