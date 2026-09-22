// ===================================================
// CONFIGURAÇÃO DO SUMLY
// ===================================================
// Este arquivo guarda o que é seu: chaves, preços e contatos.
// Ele NUNCA é sobrescrito nas atualizações do app — configure uma vez
// e não precisa mexer de novo.

const SUMLY_CONFIG = {

  // --- Proteção contra abuso (Firebase App Check) ---
  // Impede que alguém use suas chaves para disparar milhões de requisições
  // e inflar sua conta. Deixe siteKey vazio enquanto não configurar — o app
  // funciona sem, só fica desprotegido contra esse tipo de ataque.
  //
  // Como obter:
  //   Enterprise (recomendado p/ projetos novos):
  //     Google Cloud Console → Segurança → reCAPTCHA → Criar chave
  //     Tipo: "Site" / pontuação (score-based). Domínio: seu site.
  //   v3 clássico (ainda funciona, mas o Google recomenda migrar):
  //     google.com/recaptcha/admin/create → reCAPTCHA v3
  //
  // Depois registre no Console do Firebase → Build → App Check.
  appCheck: {
    tipo: 'enterprise',   // 'enterprise' ou 'v3'
    siteKey: ''
  },

  // --- Cobrança e assinatura ---
  assinatura: {
    precoMensal: 'R$ 14,90',

    // URL do backend na Vercel (sem barra no final).
    // Deixando vazio, o app cai no modo Pix manual.
    urlBackend: 'https://financeiro-pagamentos.vercel.app',

    // Usados só quando não há backend configurado
    chavePix: 'davipf57@gmail.com',
    whatsappSuporte: '5548999544454',   // DDI + DDD + número, só dígitos

    // E-mails que podem liberar assinaturas manualmente.
    // Precisa bater com a lista em firestore.rules → souAdministrador()
    // (quem está aqui também ganha Premium automaticamente)
    administradores: ['davipf57@gmail.com'],

    // Contas com Premium liberado de graça, sem prazo: testadores, família,
    // amigos, parcerias. Basta adicionar o e-mail na lista e subir o arquivo.
    // Para liberações temporárias (ex: 3 meses), use o painel dentro do app
    // em Ajustes → Casa → Administração de assinaturas.
    contasCortesia: [
      // 'esposa@email.com',
      // 'testador@email.com',
    ]
  },

  // --- Conexão com o Firebase ---
  // Não é segredo: são endereços públicos do seu projeto. A segurança de
  // verdade vem do login e das regras do Firestore.
  firebase: {
    apiKey: "AIzaSyCkbchoupXabFCp3asqWXt203FqJL6E_QY",
    authDomain: "controle-financeiro-6c605.firebaseapp.com",
    projectId: "controle-financeiro-6c605",
    storageBucket: "controle-financeiro-6c605.firebasestorage.app",
    messagingSenderId: "5568822221",
    appId: "1:5568822221:web:9bc802718b05f4de9e2284"
  }

};
