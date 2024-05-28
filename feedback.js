feedback_area = document.querySelector("textarea[class='feedback-area']");
chars_left = document.querySelector("p[id='chars-left']");
feedback_area.oninput = (event) => {
    chars_left.innerHTML = feedback_area.value.length + "/1024 characters";
    if(feedback_area.value.length > 1024) {
        chars_left.style.color = "#ff5555";
    } else {
        chars_left.style.color = "white";
    }
};

chars_left.addEventListener("animationend", () => {
    chars_left.classList.toggle("shake");
});
submit = document.querySelector("button[id='submit']");
submit.onclick = () => {
    if(feedback_area.value.length > 1024) {
        // Shake animation
        chars_left.classList.toggle("shake");
        return;
    }
    console.log(navigator.userAgent);
    if(confirm("You will not be able to edit your message after submitting.\nSubmit?")) {
        // Send to Amplitude
        $.ajax({
            url: 'https://api2.amplitude.com/2/httpapi',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            data: JSON.stringify({
                "api_key": "6d2e02f0d35a17379bc3e47252bca5d",
                "events": [{
                    "user_id": "artslide-website",
                    "device_id": "artslide-website",
                    "event_type": "feedback",
                    "platform": navigator.userAgent,
                    "event_properties": {
                        "msg": feedback_area.value
                    }
                }]
            }),
            success: function () {
                console.log(JSON.stringify({
                    "api_key": "6d2e02f0d35a17379bc3e47252bca5d",
                    "events": [{
                        "user_id": "artslide-website",
                        "device_id": "artslide-website",
                        "event_type": "feedback",
                        "platform": navigator.userAgent,
                        "event_properties": {
                            "msg": feedback_area.value
                        }
                    }]
                }));
            }
        })
    } else {
        return;
    }
}
