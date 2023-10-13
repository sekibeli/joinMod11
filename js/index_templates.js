function showSignUp(){
    let loginBox = document.getElementById('log-in-content');
    loginBox.innerHTML = `
        <span onclick="showLogin()" class="arrow-left">&#10132;</span>
        <span class="login-headline" id="login-headline">Sign Up</span>
        <div class="underline-login" id="login-underline">
        </div>
        <form onsubmit="signUp(); return false;" class="login-form" id="signup-form">
             <div class="login-box">
                <input type="text" required placeholder="First and last name" id="signup-name" oninvalid="this.setCustomValidity('Please enter first and last name')">
                <img src="assets/img/icon_person.png" alt="">
            </div>
            <div class="login-box">
                <input type="email" required minlength="5" placeholder="Email" id="signup-email">
                <img src="assets/img/icon-email.svg" alt="">
            </div>
            <div class="error-message-login" id="error-message-signup">
            </div>
            <div class="login-box">
                <input  minlength="4" required type="password" placeholder="Password" id="signup-password">
                <img src="assets/img/icon-password.svg" alt="">
            </div>
            <div class="login-and-guest">
                <input type="submit" value="Sign up" class="signup-save">
            </div>
        </form>
    `;
}


function showForgotPassword(){
    let loginBox = document.getElementById('log-in-content');
    loginBox.innerHTML = `
        <span onclick="showLogin()" class="arrow-left">&#10132;</span>
        <span class="login-headline-password" id="login-headline">I forgot my password</span>
        <div class="underline-login" id="login-underline">
        </div>
        <div class="worry-not">
            <span>Don't worry! We will send you an email with the instructions to reset your password.</span>
        </div>
        <form class="send-mail-form" action="send_mail.php" method="POST">
            <div class="login-box">
                <input type="email" placeholder="Email" name="mailadress" id="mailadress-forgot">
            </div>
            <input name="name" placeholder="Dein Name" id="name-forgot">
            <textarea name="message" placeholder="Deine Nachricht an uns" id="message-forgot"></textarea>
            <button type="submit" id="button-submit-forgot">Mail senden</button>
        </form>
        <span class="warning-message d-none" id="warning-message">email is not registered</span>
        <button class="continue" id="button-send-mail-forgotten" onclick="sendMailForgotPassword()">Continue</button>

    `;
}


function showLogin(){
    let loginBox = document.getElementById('log-in-content');
    loginBox.innerHTML = `
                <div class="sign-box" id="sign-box">
                <span class="login-headline" id="login-headline">Log In</span>
                <div class="underline-login" id="login-underline">
                </div>
                <form onsubmit="login(); return false;" class="login-form">
                    <div class="login-box">
                        <input type="email" required minlength="5" placeholder="Email" id="login-input-email" oninvalid="this.setCustomValidity('Please Enter valid email')">
                        <img src="assets/img/icon-email.svg" alt="">
                    </div>
                    <div class="error-message-login" id="error-message-login">
                        email or password is incorrect
                    </div>
                    <div class="login-box">
                        <input type="password" required minlength="5" placeholder="Password" id="login-input-password">
                        <img src="assets/img/icon-password.svg" alt="">
                    </div>
                    <div class="remember-forgot-box">
                        <div class="remember-check">
                            <input type="checkbox" id="remember">
                            <label for="remember">Remember Me</label>
                        </div>
                        <a onclick="showForgotPassword()">Forgot my password</a>
                    </div>
                    <div class="login-and-guest">
                        <input type="submit" value="Log in" class="input-submit">
                        <div class="guest-login" onclick="guestLogin()">Guest Log in</div>
                    </div>
                </form>
            </div>
            <div class="forgot-container d-none" id="forgot-container">   
            </div>
    `;
}