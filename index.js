var effect;
        function scrollMain() {
            effect = setTimeout(function () {
                document.querySelector("nav").style.backgroundColor = "rgb(4, 4, 45)";
            }, 100);
        }
        window.onload = function () {
            document.querySelector(".mainContainer").addEventListener("scroll", () => {
                document.querySelector("nav").style.backgroundColor = "rgb(1,1,4)";
                clearTimeout(effect);
                scrollMain();
            });
        }

        function HandleMenuClick() {
            var menuStyle = document.querySelector("#navMenu").style;
            menuStyle.display == 'none' ? menuStyle.display = 'block' : menuStyle.display = 'none';
        }

        function sendMail() {
            const form = document.querySelector('#contactform');
            const formName = document.querySelector('#formNameInput');
            const formEmail = document.querySelector('#formEmailInput');
            const formMsg = document.querySelector('#formMsgInput');
            const formSendMsg = document.querySelector('#formSendMsg');
            Email.send({
                Host: "smtp.elasticemail.com",
                Username:"pkdummyemailadd@gmail.com",
                Password:"AE5B0E80202D7418269D7CDD17960D3C698C",
                To: 'pkdummyemailadd@gmail.com',
                From:'pkdummyemailadd@gmail.com',
                Subject: "Message From "+formName.value+' and Email Id Is '+formEmail.value,
                Body: formMsg.value,
            }).then(
                message => {
                if (message == "OK") {
                    formSendMsg.innerHTML = 'Message Sent Successfully';
                }
                else{
                    formEmail.innerHTML='Invalid Credential';
                }
                }
            );
        }

        function clearInput(){
            var fields=document.querySelectorAll(".formStyle");
            Array.from(fields).forEach((e)=>{
                e.value='';
            })
        }
        function HandleFormSubmit(e) {
            e.preventDefault();
            sendMail();
            clearInput();
        }