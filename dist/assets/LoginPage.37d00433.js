import{_ as h,o as c,c as r,a,w as u,b as _,v as d,n as m,d as p,e as n,f as v,p as f,g}from"./index.66b0bfab.js";const w={data(){return{password:null,password_length:0,contains_eight_characters:!1,contains_number:!1,contains_uppercase:!1,contains_special_character:!1,valid_password:!1,pass_focus:!1,email:null,valid_email:!1}},methods:{async login(){const t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:this.email,password:this.password})};try{await fetch("http://restapi.adequateshop.com/api/authaccount/login",t).then(s=>s.json()).then(s=>{s.code==0?(localStorage.setItem("token",s.data.Token),this.$router.replace("/products")):(this.email=null,this.password=null,this.valid_email=!1,this.valid_password=!1,alert(s.message))})}catch{alert("Invalid Email or Password")}},checkPassword(){this.password_length=this.password.length;const t=/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;this.password_length>8?this.contains_eight_characters=!0:this.contains_eight_characters=!1,this.contains_number=/\d/.test(this.password),this.contains_uppercase=/[A-Z]/.test(this.password),this.contains_special_character=t.test(this.password),this.contains_eight_characters===!0&&this.contains_special_character===!0&&this.contains_uppercase===!0&&this.contains_number===!0||this.password==="123456"?this.valid_password=!0:this.valid_password=!1},checkEmail(){(s=>s.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))(this.email)?this.valid_email=!0:this.valid_email=!1}}},l=t=>(f("data-v-dd59f600"),t=t(),g(),t),k=l(()=>a("div",{class:"text"},"Login to access all the features",-1)),b={class:"container"},y=l(()=>a("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/icon?family=Material+Icons"},null,-1)),C={class:"screen"},E={class:"screen__content"},I={class:"login__field"},S=l(()=>a("i",{class:"login__icon material-icons"},"person",-1)),x={class:"login__field"},P=l(()=>a("i",{class:"login__icon material-icons"},"lock",-1)),z={key:0,class:"button login__submit",type:"submit"},V=l(()=>a("span",{class:"button__text"},"Log In",-1)),N=l(()=>a("i",{class:"button__icon material-icons"},"arrow_forward_ios",-1)),B=[V,N],L={key:1,class:"input_container"},M={width:"50%",height:"50%",viewBox:"0 0 140 100"},T=v('<div class="screen__background" data-v-dd59f600><span class="screen__background__shape screen__background__shape4" data-v-dd59f600></span><span class="screen__background__shape screen__background__shape3" data-v-dd59f600></span><span class="screen__background__shape screen__background__shape2" data-v-dd59f600></span><span class="screen__background__shape screen__background__shape1" data-v-dd59f600></span></div>',1);function q(t,s,A,F,e,o){return c(),r("section",null,[k,a("div",b,[y,a("div",C,[a("div",E,[a("form",{class:"login",onSubmit:s[8]||(s[8]=u((...i)=>o.login&&o.login(...i),["prevent"]))},[a("div",I,[S,_(a("input",{type:"email",pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",oninvalid:"setCustomValidity('Invalid Email')",oninput:"setCustomValidity('')","onUpdate:modelValue":s[0]||(s[0]=i=>e.email=i),onFocusout:s[1]||(s[1]=(...i)=>o.checkEmail&&o.checkEmail(...i)),style:m({borderColor:!e.valid_email&&e.valid_password?"red":""}),onInput:s[2]||(s[2]=(...i)=>o.checkEmail&&o.checkEmail(...i)),class:"login__input",placeholder:"Email",required:""},null,36),[[d,e.email,void 0,{trim:!0}]])]),a("div",x,[P,_(a("input",{type:"password",class:"login__input",placeholder:"Password",onInput:s[3]||(s[3]=(...i)=>o.checkPassword&&o.checkPassword(...i)),"onUpdate:modelValue":s[4]||(s[4]=i=>e.password=i),onFocusin:s[5]||(s[5]=i=>e.pass_focus=!0),onFocusout:s[6]||(s[6]=i=>e.pass_focus=!1),autocomplete:"off",required:""},null,544),[[d,e.password]])]),a("a",{onClick:s[7]||(s[7]=i=>(e.password=null,e.email=null,e.valid_email=!1,e.valid_password=!1))},"Reset?"),e.valid_password&&e.valid_email?(c(),r("button",z,B)):p("",!0),(!e.valid_password||!e.valid_email)&&e.pass_focus?(c(),r("div",L,[a("ul",null,[a("li",{class:n({is_valid:e.contains_eight_characters})},"8 Characters",2),a("li",{class:n({is_valid:e.contains_number})},"Contains Number",2),a("li",{class:n({is_valid:e.contains_uppercase})},"Contains Uppercase",2),a("li",{class:n({is_valid:e.contains_special_character})}," Contains Special Character ",2)]),a("div",{class:n(["checkmark_container",{show_checkmark:e.valid_password}])},[(c(),r("svg",M,[a("path",{class:n(["checkmark",{checked:e.valid_password}]),d:"M10,50 l25,40 l95,-70"},null,2)]))],2)])):p("",!0)],32)]),T])])])}const Z=h(w,[["render",q],["__scopeId","data-v-dd59f600"]]);export{Z as default};
