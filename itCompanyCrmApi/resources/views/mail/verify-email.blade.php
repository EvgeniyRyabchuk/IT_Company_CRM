
<div style="text-align: center">

    <h1>Hello {{$user->full_name}} . Your verify code is: </h1>
    <p>
        {{ $verification->token }}
    </p>
</div>
