

<div style="margin: 50px auto;   border: 1px solid black;">

    <div>
        <h3></h3>
        <p>
            Congratulations. Нou are on the team. You can login to your account now
        </p>

        <div>
            <h4>Your credentials</h4>
            Login: {{ $employee->email }}
            <br>
            Password: {{ $tempPwd }}
        </div>

        <hr>
        <a href="  {{ env('FRONTEND_EMPLOYEE_CLIENT_APP_URL') . "/session/signin" }}">
            {{ env('FRONTEND_EMPLOYEE_CLIENT_APP_URL') . "/session/signin" }}
        </a>
    </div>

</div>
