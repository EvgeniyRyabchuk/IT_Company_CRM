

<div style="margin: 50px auto; border: 1px solid black; " >

    <div>
        <h3>Thank you for contacting us</h3>
        <p>
            You can track your order in your account using the link below.


        </p>

        <div>
            <h4>Your credentials</h4>
            Login: {{ $customer->email }}
            <br>
            Password: {{ $tempPwd }}
        </div>

        <hr>
        <a href="  {{ env('CLIENT_BASE_URL') . "/login" }}">  {{ env('CLIENT_BASE_URL') . "/login" }}</a>
    </div>

</div>
