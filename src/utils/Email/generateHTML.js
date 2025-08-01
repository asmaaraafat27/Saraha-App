export const signUp = (link, name)=>
`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activate Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            background-color:rgb(40, 74, 167);
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 18px;
            margin-top: 20px;
        }
        .button:hover {
            background-color:rgb(1, 13, 3);
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Hello, ${name}!</h2> <!-- Placeholder for user name -->
    <p>Thank you for signing up with us! To get started, please activate your account by clicking the button below.</p>
    <a href= ${link} class="button">Activate Your Account</a>
    <p>If you did not sign up, please ignore this email.</p>
    <div class="footer">
        &copy; 2025 Your Company. All rights reserved.
    </div>
</div>

</body>
</html>
`;