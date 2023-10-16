
const respostasPredefinidas = {
    "Olá": "Olá! Como posso ajudar?",
    "olá": "Olá! Como posso ajudar?",
    "ola": "Olá! Como posso ajudar?",
    "": "1:Programa de Integridade 2:Plano de integridade 3:Instâncias de Integridade 4:Instrumentos Normativos 5:Ações de Capacitação 6:Fluxograma ",
    "1": "1: o Programa de Integridade da UFAM busca estabelecer medidas institucionais voltadas para a prevenção, detecção, punição, remediação de fraudes e atos de corrupção em apoio à boa governança. Para saber mais, <a href='https://proplan.ufam.edu.br/index.php/integ?id=91' target='_blank'>clique aqui</a>",
    "2": "2: o Plano de Integridade da UFAM consiste em um processo fundamentado e extensivo que tem como propósito fornecer razoável certeza ao alcance dos objetivos estratégicos da organização. Para saber mais, <a href='https://proplan.ufam.edu.br/index.php/integ?id=227' target='_blank'>clique aqui</a>.",
    "3": "3:  as instâncias responsáveis pelas ações de Integridade da Universidade Federal do Amazonas foram instituídas pela Portaria GR 2.475/2018, para tratar dos temas de integridade. Acesse o site para mais informações: <a href='https://proplan.ufam.edu.br/index.php/integ?id=275' target='_blank'>clique aqui</a>",
    "4": "4: acesse o site para mais informações: <a href='https://proplan.ufam.edu.br/index.php/integ?id=228' target='_blank'>clique aqui</a>",
    "5": "5:acesse o site para mais informações: <a href='https://proplan.ufam.edu.br/index.php/integ?id=269' target='_blank'>clique aqui</a>",
    "6": "6: acesse o site para mais informações: <a href='https://proplan.ufam.edu.br/index.php/integ?id=268' target='_blank'>clique aqui</a>"
    // Adicione mais pares de perguntas e respostas aqui
};

class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }


    onSendButton(chatbox) {
        const textField = chatbox.querySelector('input');
        const text1 = textField.value;
        if (text1 === "") {
            return;
        }

        let respostaDoChatbot = respostasPredefinidas[text1] || "Desculpe, não entendi. Por favor, faça outra pergunta.";

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        let msg2 = { name: "Sam", message: respostaDoChatbot };
        this.messages.push(msg2);

        this.updateChatText(chatbox);
        textField.value = '';
    }


    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item, index) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();