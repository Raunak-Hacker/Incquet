<template>
  <section>
    <div class="text">Login to access all the features</div>
    <div class="container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div class="screen">
        <div class="screen__content">
          <form class="login" @submit.prevent="login">
            <div class="login__field">
              <i class="login__icon material-icons">person</i>
              <input
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                oninvalid="setCustomValidity('Invalid Email')"
                oninput="setCustomValidity('')"
                v-model.trim="email"
                @focusout="checkEmail"
                :style="{ borderColor: !valid_email && valid_password ? 'red' : '' }"
                @input="checkEmail"
                class="login__input"
                placeholder="Email"
                required
              />
            </div>
            <div class="login__field">
              <i class="login__icon material-icons">lock</i>
              <input
                type="password"
                class="login__input"
                placeholder="Password"
                @input="checkPassword"
                v-model="password"
                @focusin="pass_focus = true"
                @focusout="pass_focus = false"
                autocomplete="off"
                required
              />
            </div>
            <a
              @click="
                (password = null),
                  (email = null),
                  (valid_email = false),
                  (valid_password = false)
              "
              >Reset?</a
            >
            <button
              class="button login__submit"
              type="submit"
              v-if="valid_password && valid_email"
            >
              <span class="button__text">Log In</span>
              <i class="button__icon material-icons">arrow_forward_ios</i>
            </button>
            <div
              class="input_container"
              v-if="(!valid_password || !valid_email) && pass_focus"
            >
              <ul>
                <li :class="{ is_valid: contains_eight_characters }">8 Characters</li>
                <li :class="{ is_valid: contains_number }">Contains Number</li>
                <li :class="{ is_valid: contains_uppercase }">Contains Uppercase</li>
                <li :class="{ is_valid: contains_special_character }">
                  Contains Special Character
                </li>
              </ul>

              <div
                class="checkmark_container"
                :class="{ show_checkmark: valid_password }"
              >
                <svg width="50%" height="50%" viewBox="0 0 140 100">
                  <path
                    class="checkmark"
                    :class="{ checked: valid_password }"
                    d="M10,50 l25,40 l95,-70"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      password: null,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      pass_focus: false,
      email: null,
      valid_email: false,
    };
  },
  methods: {
    async login() {
      const user = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      };
      try {
        await fetch("http://restapi.adequateshop.com/api/authaccount/login", user)
          .then((res) => res.json())
          .then((data) => {
            if (data.code == 0) {
              localStorage.setItem("token", data.data.Token);
              this.$router.replace("/products");
            } else {
              this.email = null;
              this.password = null;
              this.valid_email = false;
              this.valid_password = false;
              alert(data.message);
            }
          });
      } catch (e) {
        alert("Invalid Email or Password");
      }

      //   this.$router.push("/dashboard");
    },
    checkPassword() {
      this.password_length = this.password.length;
      const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      if (this.password_length > 8) {
        this.contains_eight_characters = true;
      } else {
        this.contains_eight_characters = false;
      }

      this.contains_number = /\d/.test(this.password);
      this.contains_uppercase = /[A-Z]/.test(this.password);
      this.contains_special_character = format.test(this.password);

      if (
        (this.contains_eight_characters === true &&
          this.contains_special_character === true &&
          this.contains_uppercase === true &&
          this.contains_number === true) ||
        this.password === "123456"
      ) {
        this.valid_password = true;
      } else {
        this.valid_password = false;
      }
    },
    checkEmail() {
      const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
      if (validateEmail(this.email)) {
        this.valid_email = true;
      } else {
        this.valid_email = false;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Raleway, sans-serif;
}
::-webkit-scrollbar {
  width: 0;
}

a {
  cursor: pointer;
}
.text {
  position: absolute;
  top: 50%;
  left: 4%;
  font-size: x-large;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-left: 30vw; */
  max-height: 86vh;
  height: 86vh;
  width: 100%;
  position: relative;
}

.screen {
  background: linear-gradient(90deg, #5d54a4, #7c78b8);
  position: relative;
  height: 90%;
  width: 24%;
  box-shadow: 0px 0px 24px #5c5696;
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
}

.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
  overflow: hidden;
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #fff;
  top: -50px;
  right: 120px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6c63ac;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5d54a4, #6a679e);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7e7bb9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}

.login__icon {
  position: absolute;
  top: 25px;
  color: #7875b5;
}

.login__input {
  border: none;
  border-bottom: 2px solid #d1d1d4;
  background: none;
  padding: 10px;
  padding-left: 30px;
  font-weight: 700;
  width: 75%;
  transition: 0.2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
  outline: none;
  border-bottom-color: #6a679e;
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #d4d3e8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4c489d;
  box-shadow: 0px 2px 2px #5c5696;
  cursor: pointer;
  transition: 0.2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
  border-color: #6a679e;
  outline: none;
}

.button__icon {
  font-size: 20px;
  margin-left: auto;
  color: #7875b5;
}

.social-login {
  position: absolute;
  height: 140px;
  width: 160px;
  text-align: center;
  bottom: 0px;
  right: 0px;
  color: #fff;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-login__icon {
  padding: 20px 10px;
  color: #fff;
  text-decoration: none;
  text-shadow: 0px 0px 8px #7875b5;
}

.social-login__icon:hover {
  transform: scale(1.5);
}

.is_valid {
  color: rgba(136, 152, 170, 0.8);
}
.is_valid:before {
  width: 100%;
}

.checkmark_container {
  border-radius: 50%;
  position: absolute;
  top: -15px;
  right: -15px;
  background: #2ecc71;
  width: 50px;
  height: 50px;
  visibility: hidden;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.4s ease;
}

.show_checkmark {
  visibility: visible;
  opacity: 1;
}

.checkmark {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: white;
  stroke-width: 15;
  stroke-linecap: round;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
}

.checked {
  animation: draw 0.5s ease forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.input_container {
  top: 58%;
  position: absolute;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  background: #fff;
}

.input_container input[type="password"] {
  line-height: 1.5;
  display: block;
  color: rgba(136, 152, 170, 1);
  font-weight: 300;
  width: 100%;
  height: calc(2.75rem + 2px);
  padding: 0.625rem 0.75rem;
  border-radius: 0.25rem;
  background-color: #fff;
  transition: border-color 0.4s ease;
  border: 1px solid #cad1d7;
  outline: 0;
}

.input_container input[type="password"]:focus {
  border-color: rgba(50, 151, 211, 0.45);
}
ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

li {
  margin-bottom: 8px;
  color: #525f7f;
  position: relative;
}

li:before {
  content: "";
  width: 0%;
  height: 2px;
  background: #2ecc71;
  position: absolute;
  left: 0;
  top: 50%;
  display: block;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@media screen and (max-width: 768px) {
  .text {
    display: none;
  }
  .login {
    width: 100%;
  }
  .login__input {
    width: 75%;
  }
  .screen {
    width: 80vw;
  }
  .input_container {
    top: -2rem;
    white-space: nowrap;
  }
}
</style>
