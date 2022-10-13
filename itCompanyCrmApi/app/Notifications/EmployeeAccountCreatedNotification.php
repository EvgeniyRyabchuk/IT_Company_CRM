<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EmployeeAccountCreatedNotification extends Notification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $employee;
    private $tempPwd;

    public function __construct($employee, $tempPwd)
    {
        $this->employee = $employee;
        $this->tempPwd = $tempPwd;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $employee = $this->employee;
        $tempPwd = $this->tempPwd;
        return (new MailMessage)
            ->view("mail.created-employee-account-info", compact('employee', 'tempPwd'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
