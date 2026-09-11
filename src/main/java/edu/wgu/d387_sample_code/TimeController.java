package edu.wgu.d387_sample_code;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/presentation")
public class TimeController {

    @GetMapping
    public String getPresentationTime() {
        LocalDateTime localDateTime = LocalDateTime.of(2024, 1, 1, 15, 0);
        ZonedDateTime easternTime = ZonedDateTime.of(localDateTime, ZoneId.of("America/New_York"));
        ZonedDateTime mountainTime = easternTime.withZoneSameInstant(ZoneId.of("America/Denver"));
        ZonedDateTime utcTime = easternTime.withZoneSameInstant(ZoneId.of("UTC"));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

        return "Live Online Presentation Starts At: " +
                easternTime.format(formatter) + " ET | " +
                mountainTime.format(formatter) + " MT | " +
                utcTime.format(formatter) + " UTC";
    }
}