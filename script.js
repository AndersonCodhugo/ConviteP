// Função para soltar confetes
function dispararConfetes() {
    confetti({
        particleCount: 150, 
        spread: 80,         
        origin: { y: 0.6 }, 
        colors: ['#28a745', '#FFD700', '#ff2a85', '#FFFFFF'],
        shapes: ['circle', 'square'],
        scalar: 1.2
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Telas
    const telaInicial = document.getElementById('tela-inicial');
    const telaConvite = document.getElementById('tela-convite');
    const telaConfirmacao = document.getElementById('tela-confirmacao');
    const telaComemoracao = document.getElementById('tela-comemoracao');
    const telaExplosao = document.getElementById('tela-explosao');

    // Botões e Elementos
    const btnAbrir = document.getElementById('btn-abrir');
    const btnSim = document.getElementById('btn-sim');
    const btnNao = document.getElementById('btn-nao');
    const btnConfirmaSim = document.getElementById('btn-confirma-sim');
    const btnConfirmaNao = document.getElementById('btn-confirma-nao');
    const musica = document.getElementById('musica-fundo');

    function esconderTudo() {
        telaInicial.classList.add('hidden');
        telaConvite.classList.add('hidden');
        telaConfirmacao.classList.add('hidden');
        telaComemoracao.classList.add('hidden');
        telaExplosao.classList.add('hidden');
    }

    // 1. Tocar música e mostrar convite
    btnAbrir.addEventListener('click', () => {
        musica.play().catch(() => console.log("Áudio automático bloqueado."));
        esconderTudo();
        telaConvite.classList.remove('hidden');
    });

    // 2. Lógica do botão "Não" fugindo 3 vezes
    let fugas = 0;

    function fugir(evento) {
        if (evento) evento.preventDefault(); 

        if (fugas < 3) {
            fugas++;
            btnNao.style.position = 'fixed';
            
            const margemSeguranca = 20;
            const maxX = window.innerWidth - btnNao.offsetWidth - margemSeguranca;
            const maxY = window.innerHeight - btnNao.offsetHeight - margemSeguranca;
            
            const randomX = Math.max(margemSeguranca, Math.floor(Math.random() * maxX));
            const randomY = Math.max(margemSeguranca, Math.floor(Math.random() * maxY));

            btnNao.style.left = `${randomX}px`;
            btnNao.style.top = `${randomY}px`;
        } else {
            // Após 3 fugas, mostra a tela "Tem certeza disso?"
            esconderTudo();
            telaConfirmacao.classList.remove('hidden');
        }
    }

    btnNao.addEventListener('touchstart', fugir, { passive: false });
    btnNao.addEventListener('mouseover', fugir);
    btnNao.addEventListener('click', fugir);

    // 3. Lógica do "Sim" (Aceitou o convite para o cinema)
    function comemorarEIrProZap() {
        esconderTudo();
        telaComemoracao.classList.remove('hidden');
        
        dispararConfetes();
        setTimeout(dispararConfetes, 500);

        const numeroWhatsApp = "5579998792211"; 
        const mensagemEnviada = encodeURIComponent("Oii, eu aceito ir ao cinema com você no próximo sábado Anderson!");

        setTimeout(() => {
            window.location.href = `https://wa.me/${numeroWhatsApp}?text=${mensagemEnviada}`;
        }, 4000);
    }

    // Se ela clicar SIM logo de cara no convite principal
    btnSim.addEventListener('click', comemorarEIrProZap);
    
    // Se ela clicar em "Não, mudei de ideia" na tela de confirmação (ela decidiu que vai!)
    btnConfirmaNao.addEventListener('click', comemorarEIrProZap);

    // 4. Lógica do HACKER/404 se ela clicar em "Sim, tenho certeza"
    btnConfirmaSim.addEventListener('click', () => {
        esconderTudo();
        telaExplosao.classList.remove('hidden');
        document.body.classList.add('hacker-theme'); 
        musica.pause(); 
    });
});