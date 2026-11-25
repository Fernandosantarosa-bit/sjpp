import React from 'react';
import './legal.css';

const pages = {
  privacidade: {
    title: 'Política de Privacidade',
    intro: 'Esta política explica como o portal institucional do S.J.P.P. recolhe, utiliza, conserva e protege os dados pessoais enviados voluntariamente pelos visitantes.',
    sections: [
      ['1. Responsável pelo tratamento', 'O responsável institucional pelo portal é o Partido Social Juntos Pelo Povo (S.J.P.P.). Para assuntos de privacidade: juntospelopovosjpp@gmail.com ou +244 947 152 305. Sede indicada: Luanda, Município de Belas, Bairro Matadouro, Rua Principal, Casa n.º 119.'],
      ['2. Dados recolhidos', 'O formulário de contacto geral pode recolher nome, email, telefone, assunto e mensagem. A data e a versão do consentimento também são registadas. O formulário não é um canal de adesão, inscrição de membros, recolha de donativos ou consulta de opiniões políticas. Não envie filiação ou opiniões políticas, dados de saúde, religião, documentos de identificação, dados financeiros ou informação privada de terceiros. Para reduzir a recolha, indique apenas os dados estritamente necessários para receber uma resposta.'],
      ['3. Finalidade e fundamento', 'Os dados são utilizados exclusivamente para receber, analisar e responder a pedidos de informação institucional geral e manter registos mínimos de segurança. O envio depende de consentimento expresso, registado com data e versão da política, que pode ser retirado mediante pedido, sem afectar o tratamento anterior à retirada. Não serão utilizados para criar perfis, listas de apoiantes ou bases de dados de filiação política.'],
      ['4. Conservação', 'As mensagens devem ser conservadas apenas durante o tempo necessário para responder e acompanhar o assunto e eliminadas ou anonimizadas depois, salvo obrigação legal ou necessidade de defesa de direitos. O responsável ainda deve aprovar um prazo interno concreto e uma rotina de eliminação; actualmente não está configurada uma eliminação automática programada.'],
      ['5. Partilha e prestadores', 'Os dados não são vendidos nem utilizados para publicidade comportamental. O portal utiliza a Vercel para alojamento da aplicação e Supabase para base de dados e autenticação. A base de dados do projecto está configurada na região eu-west-1 (Irlanda). Prestadores e subcontratantes podem tratar dados técnicos necessários à operação. A localização e o nível de protecção dos destinos, bem como a eventual autorização prévia da APD para transferências internacionais, devem ser confirmados pelo responsável antes da recolha regular de dados.'],
      ['6. Direitos dos titulares', 'Pode solicitar informação, acesso, rectificação, actualização, eliminação ou oposição, e retirar o consentimento, através de juntospelopovosjpp@gmail.com. Poderá também contactar a Agência de Protecção de Dados de Angola.'],
      ['7. Segurança', 'São utilizadas medidas técnicas e organizativas razoáveis, incluindo controlo de acesso ao painel e políticas de acesso à base de dados. Nenhum sistema ligado à Internet garante segurança absoluta.'],
      ['8. Menores', 'O formulário não se destina a recolher intencionalmente dados de menores. Quando necessário, o contacto deverá ser efectuado por representante legal.'],
      ['9. Alterações', 'Esta política pode ser actualizada por razões legais, técnicas ou operacionais. A versão e a data serão indicadas nesta página.'],
      ['10. Enquadramento legal', 'Documento preparado tendo em consideração a Lei n.º 22/11, de 17 de Junho (Lei da Protecção de Dados Pessoais). A APD disponibiliza um procedimento de legalização/notificação do tratamento de dados. O responsável deve confirmar e cumprir as formalidades aplicáveis, incluindo as relativas a dados sensíveis e transferências internacionais, antes de iniciar qualquer tratamento que as exija. Esta política não constitui autorização, registo ou certificação da APD e não substitui parecer jurídico.']
    ]
  },
  termos: {
    title: 'Termos de Utilização',
    intro: 'Regras básicas para utilização responsável deste portal institucional.',
    sections: [
      ['1. Natureza do portal', 'O portal destina-se à divulgação de informação institucional, documentos, notícias, agenda e canais de contacto do S.J.P.P.'],
      ['2. Utilização responsável', 'O visitante compromete-se a utilizar o portal de forma lícita e respeitosa. Não é permitido introduzir código malicioso, enviar spam, tentar comprometer a segurança ou utilizar formulários para assédio, fraude ou divulgação ilícita de dados de terceiros.'],
      ['3. Informação e documentos', 'Os conteúdos são disponibilizados para informação pública. Confirme junto dos canais institucionais a actualidade e autenticidade de documentos quando isso for relevante.'],
      ['4. Propriedade intelectual', 'Salvo indicação em contrário, textos, marcas e elementos institucionais pertencem aos respectivos titulares. A reprodução deve respeitar os direitos aplicáveis e indicar a fonte.'],
      ['5. Ligações externas', 'O portal pode conter ligações para serviços externos, cujos conteúdos e políticas são da responsabilidade dos respectivos operadores.'],
      ['6. Disponibilidade', 'O portal pode ser actualizado, suspenso ou alterado por razões técnicas, de segurança ou institucionais.'],
      ['7. Contacto', 'Questões sobre estes termos: juntospelopovosjpp@gmail.com.']
    ]
  },
  cookies: {
    title: 'Política de Cookies',
    intro: 'Informação sobre cookies e tecnologias de armazenamento utilizadas no portal.',
    sections: [
      ['1. Cookies essenciais', 'O portal público não utiliza, nesta versão, cookies de publicidade nem ferramentas de rastreamento comportamental. A área administrativa utiliza mecanismos técnicos de autenticação e armazenamento de sessão fornecidos pelo Supabase para permitir o acesso a utilizadores autorizados.'],
      ['2. Serviços externos', 'O portal carrega fontes tipográficas do Google Fonts e disponibiliza uma ligação externa para WhatsApp. O carregamento de recursos externos pode transmitir dados técnicos, como endereço IP, navegador e informação do dispositivo, aos respectivos fornecedores. O WhatsApp só é aberto quando o visitante utiliza a ligação. Consulte as políticas desses serviços para conhecer os tratamentos efectuados por terceiros.'],
      ['3. Gestão', 'Pode limitar ou apagar cookies e dados locais nas definições do navegador. A remoção dos dados de autenticação pode terminar a sessão administrativa. O bloqueio do armazenamento essencial poderá impedir o funcionamento da área restrita.'],
      ['4. Actualizações', 'Esta política será revista se forem adicionadas ferramentas de análise, publicidade, mapas, vídeos incorporados ou outras tecnologias que alterem o uso de cookies.']
    ]
  },
  acessibilidade: {
    title: 'Declaração de Acessibilidade',
    intro: 'O S.J.P.P. procura manter este portal compreensível, navegável e utilizável em diferentes dispositivos.',
    sections: [
      ['1. Compromisso', 'Trabalhamos para melhorar o contraste, a navegação por teclado, a estrutura dos títulos, a identificação dos formulários, os textos alternativos e a adaptação a ecrãs móveis.'],
      ['2. Limitações conhecidas', 'Alguns documentos de terceiros, imagens ou conteúdos antigos podem não cumprir integralmente as boas práticas de acessibilidade.'],
      ['3. Contacto e melhoria', 'Se encontrar uma barreira de acesso, informe-nos através de juntospelopovosjpp@gmail.com, indicando a página e o problema. Procuraremos corrigir as falhas identificadas.']
    ]
  }
};

export default function Legal({ type }) {
  const page = pages[type] || pages.privacidade;
  return <div className="legal-page">
    <div className="national-colours" aria-hidden="true"><span></span><span></span><span></span></div>
    <header className="legal-header"><a className="brand" href="/"><span className="brand-mark">S.J.P.P.</span><span><b>JUNTOS PELO POVO</b><small>FAZER PELO POVO E PELA PÁTRIA</small></span></a><a href="/">← Voltar ao portal</a></header>
    <main className="legal-main"><div className="eyebrow dark">INFORMAÇÃO E TRANSPARÊNCIA</div><h1>{page.title}</h1><p className="legal-intro">{page.intro}</p><p className="legal-updated">Versão 1.1 · Actualizada em 25 de Novembro de 2026</p>
      {page.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      <p className="legal-contact">Contacto: <a href="mailto:juntospelopovosjpp@gmail.com">juntospelopovosjpp@gmail.com</a> · +244 947 152 305</p>
    </main>
    <footer><div className="wrap footer-inner"><b>S.J.P.P. — JUNTOS PELO POVO</b><a href="/">Voltar à página inicial</a></div></footer>
  </div>;
}
