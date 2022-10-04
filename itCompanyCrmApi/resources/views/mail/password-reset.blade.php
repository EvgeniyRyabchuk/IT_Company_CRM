


<style>
    /*! CSS Used from: Embedded */
    .hover-underline:hover{text-decoration:underline!important;}
    @media (max-width: 600px){
        .sm-px-24{padding-left:24px!important;padding-right:24px!important;}
        .sm-py-32{padding-top:32px!important;padding-bottom:32px!important;}
        .sm-w-full{width:100%!important;}
    }
</style>

<table class="sm-w-full"
       style="font-family: 'Montserrat',Arial,
       sans-serif;
       width: 600px;"
       width="600"
       cellpadding="0" cellspacing="0" role="presentation">
    <tbody><tr>
        <td class="sm-py-32 sm-px-24" style="font-family:
         Montserrat, -apple-system, 'Segoe UI', sans-serif;
         padding: 48px; text-align: center;" align="center">
            <a href="https://1.envato.market/vuexy_admin">
                <img src="{{url('/api/storage') . "/static/images/mail/logo.png"}}" width="155"
                     alt="Vuexy Admin" style="border: 0; max-width: 100%;
                      line-height: 100%; vertical-align: middle;">
            </a>
        </td>
    </tr>
    <tr>
        <td align="center" class="sm-px-24"
            style="font-family: 'Montserrat',Arial,sans-serif;">
            <table style="font-family: 'Montserrat',Arial,sans-serif;
            width: 100%;" width="100%" cellpadding="0"
                   cellspacing="0" role="presentation">
                <tbody><tr>
                    <td class="sm-px-24" style="--bg-opacity: 1;
                     background-color: #ffffff;
                      background-color: rgba(255, 255, 255, var(--bg-opacity));
                      border-radius: 4px;
                       font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;
                       font-size: 14px;
                       line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1;
                       color: #626262;
                        color: rgba(98, 98, 98, var(--text-opacity));"
                        bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
                        <p style="font-weight: 600;
                        font-size: 18px; margin-bottom: 0;">Hey</p>
                        <p style="font-weight: 700;
                         font-size: 20px; margin-top: 0;
                        --text-opacity: 1; color: #ff5850;
                         color: rgba(255, 88, 80, var(--text-opacity));">
                            John Doe!
                        </p>
                        <p style="margin: 0 0 24px;">
                            A request to reset password was received from your
                            <span style="font-weight: 600;">
                                PixInvent</span> Account -
                            <a href="mailto:john@example.com"
                               class="hover-underline" style="--text-opacity: 1;
                            color: #7367f0; color: rgba(115, 103, 240, var(--text-opacity));
                             text-decoration: none;">
                                john@example.com
                            </a>
                            (ID: 8632698) from the IP -
                            <span style="font-weight: 600;">
                                49.34.185.199
                            </span> .
                        </p>
                        <p style="margin: 0 0 24px;">
                            Use this link to reset your password and login.
                        </p>
                        <a href="https://pixinvent.com?reset_password_url"
                           style="display: block; font-size: 14px; line-height: 100%;
                            margin-bottom: 24px; --text-opacity: 1; color: #7367f0;
                             color: rgba(115, 103, 240, var(--text-opacity));
                              text-decoration: none;">https://pixinvent.com?reset_password_url</a>
                        <table style="font-family: 'Montserrat',Arial,sans-serif;"
                               cellpadding="0" cellspacing="0" role="presentation">
                            <tbody><tr>
                                <td style="mso-padding-alt: 16px 24px; --bg-opacity: 1;
                                 background-color: #7367f0;
                                 background-color: rgba(115, 103, 240, var(--bg-opacity));
                                  border-radius: 4px;
                                  font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;"
                                    bgcolor="rgba(115, 103, 240, var(--bg-opacity))">
                                    <a
                                        href="{{ env('FRONTEND_APP_URL') . '/session/password-reset/' . $id . '/' . $token }}"
                                       style="display: block; font-weight: 600;
                                       font-size: 14px; line-height: 100%;
                                        padding: 16px 24px; --text-opacity: 1;
                                         color: #ffffff;
                                         color: rgba(255, 255, 255, var(--text-opacity));
                                         text-decoration: none;">
                                        Reset Password →
                                    </a>
                                </td>
                            </tr>
                            </tbody></table>
                        <p style="margin: 24px 0;">
                            <span style="font-weight: 600;">
                                Note:
                            </span>
                            This link is valid for 1 hour from the time it was
                            sent to you and can be used to change your password only once.
                        </p>
                        <p style="margin: 0;">
                            If you did not intend to deactivate your
                            account or need our help keeping the account, please
                            contact us at
                            <a href="mailto:support@example.com"
                               class="hover-underline" style="--text-opacity: 1;
                             color: #7367f0; color: rgba(115, 103, 240, var(--text-opacity));
                             text-decoration: none;">support@example.com</a>
                        </p>
                        <table style="font-family: 'Montserrat',Arial,sans-serif;
                        width: 100%;"
                               width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody><tr>
                                <td style="font-family: 'Montserrat',Arial,sans-serif;
                                padding-top: 32px;
                                padding-bottom: 32px;">
                                    <div style="--bg-opacity: 1;
                                     background-color: #eceff1;
                                    background-color: rgba(236, 239, 241, var(--bg-opacity));
                                     height: 1px;
                                     line-height: 1px;">
                                        ‌
                                    </div>
                                </td>
                            </tr>
                            </tbody></table>
                        <p style="margin: 0 0 16px;">
                            Not sure why you received this email? Please
                            <a href="mailto:support@example.com"
                               class="hover-underline"
                               style="--text-opacity: 1;
                               color: #7367f0; color:
                                rgba(115, 103, 240, var(--text-opacity));
                                 text-decoration: none;">
                                let us know
                            </a>.
                        </p>
                        <p style="margin: 0 0 16px;">
                            Thanks,
                            <br>The PixInvent Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="font-family: 'Montserrat',Arial,sans-serif;
                     height: 20px;
                     " height="20"></td>
                </tr>
                <tr>
                    <td style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;
                    font-size: 12px; padding-left: 48px;
                    padding-right: 48px; --text-opacity: 1;
                     color: #eceff1;
                      color: rgba(236, 239, 241, var(--text-opacity));">
                        <p align="center"
                           style="cursor: default;
                         margin-bottom: 16px;">
                            <a href="https://www.facebook.com/pixinvents"
                               style="--text-opacity: 1;
                               color: #263238;
                               color: rgba(38, 50, 56, var(--text-opacity));
                               text-decoration: none;">
                                <img src=" {{url('/api/storage') . "/static/images/mail/facebook.png"}}"
                                     width="17"
                                     alt="Facebook" style="border: 0;
                                      max-width: 100%; line-height: 100%;
                                      vertical-align: middle; margin-right: 12px;">
                            </a>
                            •
                            <a href="https://twitter.com/pixinvents"
                               style="--text-opacity: 1;
                                color: #263238;
                               color: rgba(38, 50, 56, var(--text-opacity));
                                text-decoration: none;">
                                <img src=" {{url('/api/storage') . "/static/images/mail/twitter.png"}}"
                                     width="17" alt="Twitter" style="border: 0;
                                     max-width: 100%; line-height: 100%;
                                     vertical-align: middle;
                                     margin-right: 12px;">
                            </a>
                            •
                            <a href="https://www.instagram.com/pixinvents"
                               style="--text-opacity: 1; color: #263238;
                                color: rgba(38, 50, 56, var(--text-opacity));
                                text-decoration: none;">
                                <img src=" {{url('/api/storage') . "/static/images/mail/instagram.png"}}"
                                     width="17" alt="Instagram"
                                     style="border: 0;
                                      max-width: 100%;
                                      line-height: 100%;
                                      vertical-align: middle;
                                      margin-right: 12px;"></a>
                        </p>
                        <p style="--text-opacity: 1;
                        color: #263238;
                        color: rgba(38, 50, 56, var(--text-opacity));">
                            Use of our service and website is subject to our
                            <a href="https://pixinvent.com/"
                               class="hover-underline"
                               style="--text-opacity: 1;
                               color: #7367f0;
                               color: rgba(115, 103, 240, var(--text-opacity));
                               text-decoration: none;">
                                Terms of Use
                            </a> and
                            <a href="https://pixinvent.com/"
                               class="hover-underline"
                               style="--text-opacity: 1;
                                color: #7367f0;
                               color: rgba(115, 103, 240, var(--text-opacity));
                                text-decoration: none;">
                                Privacy Policy
                            </a>.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="font-family: 'Montserrat',Arial,sans-serif;
                    height: 16px;" height="16">

                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody></table>





{{--<div style="text-align: center">--}}

{{--    <h1>For reset your password click the link below</h1>--}}
{{--    <a href="{{ env('FRONTEND_APP_URL') . '/session/password-reset/' . $id . '/' . $token }}">Click here to reset password</a>--}}
{{--</div>--}}
