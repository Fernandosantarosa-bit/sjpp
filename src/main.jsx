import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import './styles.css';
import Admin from './Admin.jsx';
import Legal from './Legal.jsx';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const pillars = [
  ['Economia social e produtiva','Agricultura familiar, microcrédito, empreendedorismo, industrialização e criação de oportunidades de trabalho.'],
  ['Educação de qualidade e inclusiva','Educação, inclusão digital, formação técnico-profissional e aprendizagem ao longo da vida.'],
  ['Saúde e bem-estar','Reforço dos serviços públicos de saúde, acesso a medicamentos essenciais, prevenção e saúde mental.'],
  ['Juventude e desenvolvimento humano','Formação, associativismo, cidadania, liderança, primeiro emprego e empreendedorismo.'],
  ['Justiça social e direitos humanos','Protecção dos direitos fundamentais, apoio às famílias vulneráveis e promoção da igualdade perante a lei.'],
  ['Governação e descentralização','Administração pública próxima, transparência, participação comunitária e descentralização.'],
  ['Diáspora','Valorização da participação dos angolanos no exterior e criação de canais de ligação institucional.'],
  ['Cultura, turismo e desporto','Protecção do património, valorização dos artistas, turismo sustentável e desenvolvimento desportivo.']
];

function App(){
  const [menuOpen,setMenuOpen] = useState(false);
  const [news,setNews] = useState([]);
  const [newsQuery,setNewsQuery] = useState('');
  const [loadingContent,setLoadingContent] = useState(true);
  const [events,setEvents] = useState([]);
  const [docs,setDocs] = useState([]);
  const [pages,setPages] = useState([]);
  const [form,setForm] = useState({full_name:'',email:'',phone:'',subject:'',message:'',privacyConsent:false});
  const [sending,setSending] = useState(false);
  const [notice,setNotice] = useState('');
  const [backend,setBackend] = useState('A carregar conteúdos…');
  const [participation,setParticipation] = useState({category:'suggestion',topic:'',message:''});
  const [participationBusy,setParticipationBusy] = useState(false);
  const [participationNotice,setParticipationNotice] = useState('');

  useEffect(()=>{
    let active=true;
    async function load(){
      if(!supabase){setBackend('');setLoadingContent(false);return;}
      const [n,e,d,p] = await Promise.all([
        supabase.from('news_posts').select('id,title,slug,excerpt,content,published_at,cover_image_url').eq('status','published').order('published_at',{ascending:false}).limit(3),
        supabase.from('events').select('id,title,slug,description,venue,starts_at').eq('status','published').gte('starts_at',new Date().toISOString()).order('starts_at',{ascending:true}).limit(3),
        supabase.from('public_documents').select('id,title,description,file_url,category').eq('is_public',true).order('created_at',{ascending:false}).limit(8),
        supabase.from('site_pages').select('id,title,slug,summary,content').eq('status','published').order('created_at',{ascending:false}).limit(8)
      ]);
      if(!active)return;
      setLoadingContent(false);
      if(!n.error)setNews(n.data||[]);
      if(!e.error)setEvents(e.data||[]);
      if(!d.error)setDocs(d.data||[]);
      if(!p.error)setPages(p.data||[]);
      setBackend('');
    }
    load().catch(()=>{if(active){setLoadingContent(false);setBackend('Não foi possível actualizar os conteúdos neste momento.');}}); return ()=>{active=false};
  },[]);

  async function submit(e){
    e.preventDefault(); setNotice('');
    if(!form.full_name.trim()||!form.subject.trim()||form.message.trim().length<10){setNotice('Preencha o nome, assunto e uma mensagem com pelo menos 10 caracteres.');return;}
    if(!form.email.trim()&&!form.phone.trim()){setNotice('Indique pelo menos um contacto: email ou telefone.');return;}
    if(!form.privacyConsent){setNotice('É necessário aceitar a Política de Privacidade para enviar a mensagem.');return;}
    if(!supabase){setNotice('O formulário está preparado. A ligação à base de dados será activada após configurar as variáveis Supabase.');return;}
    setSending(true);
    const {privacyConsent,...contactData}=form;
    const {error}=await supabase.from('contact_messages').insert([{...contactData,status:'new',consent_at:new Date().toISOString(),privacy_version:'1.1-2026-11-25'}]);
    setSending(false);
    if(error){setNotice('Não foi possível enviar agora. Tente novamente mais tarde.');return;}
    setForm({full_name:'',email:'',phone:'',subject:'',message:'',privacyConsent:false});setNotice('Mensagem enviada. Obrigado pelo contacto.');
  }

  async function submitParticipation(e){
    e.preventDefault();setParticipationNotice('');
    if(!supabase){setParticipationNotice('O serviço está temporariamente indisponível. Tente novamente mais tarde.');return;}
    if(participation.topic.trim().length<3||participation.message.trim().length<20){setParticipationNotice('Indique um tema e uma contribuição com pelo menos 20 caracteres.');return;}
    setParticipationBusy(true);
    const {error}=await supabase.from('public_participation').insert([{category:participation.category,topic:participation.topic.trim(),message:participation.message.trim()}]);
    setParticipationBusy(false);
    if(error){setParticipationNotice('Não foi possível registar a contribuição. Tente novamente mais tarde.');return;}
    setParticipation({category:'suggestion',topic:'',message:''});
    setParticipationNotice('A sua contribuição foi recebida com sucesso. Obrigado por participar no debate público. Esta confirmação não representa adesão ou filiação partidária.');
  }
  const closeMenu=()=>setMenuOpen(false);
  useEffect(()=>{if(!menuOpen)return;const onKeyDown=e=>{if(e.key==='Escape')closeMenu();};window.addEventListener('keydown',onKeyDown);return()=>window.removeEventListener('keydown',onKeyDown);},[menuOpen]);
  return <div>
    <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a><div className="national-colours" aria-hidden="true"><span></span><span></span><span></span></div><div className="topline"><div className="wrap topline-inner"><span>Partido Social Juntos Pelo Povo — S.J.P.P.</span><span className="topline-right"><img className="angola-flag topline-flag" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira Nacional da República de Angola" width="30" height="20" loading="eager" decoding="async"/><span>Luanda, Angola · <a href="mailto:juntospelopovosjpp@gmail.com">juntospelopovosjpp@gmail.com</a></span></span></div></div>
    <header className="header"><div className="wrap nav">
      <a className="brand" href="#inicio" onClick={closeMenu} aria-label="S.J.P.P. — Juntos Pelo Povo, página inicial"><span className="brand-logo-frame"><img className="brand-logo" src="/logo-sjpp.jpg" alt="Logótipo oficial do S.J.P.P." width="76" height="54" onError={(e)=>{e.currentTarget.style.display="none";}}/><span className="brand-mark">S.J.P.P.</span></span><span className="brand-copy"><b>JUNTOS PELO POVO</b><small>FAZER PELO POVO E PELA PÁTRIA</small></span></a>
      <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?"Fechar menu":"Abrir menu"} aria-expanded={menuOpen} aria-controls="navegacao-principal">☰</button>
      <nav id="navegacao-principal" aria-label="Navegação principal" className={menuOpen?'nav-links open':'nav-links'}>{[['Início','#inicio'],['O Partido','#partido'],['Estrutura','#estrutura'],['Programa','#programa'],['Notícias','#noticias'],['Agenda','#agenda'],['Documentos','#documentos'],['Participação','#participacao'],['Contactos','#contactos']].map(([t,h])=><a key={h} href={h} onClick={closeMenu}>{t}</a>)}</nav>
    </div></header>
    <main id="conteudo" tabIndex="-1">
      <section className="hero" id="inicio"><div className="wrap hero-content"><div className="eyebrow">PROJECTO ECO NO SILÊNCIO</div><h1>O silêncio termina.<br/><em>O trabalho começa.</em></h1><p>Partido Social Juntos Pelo Povo — S.J.P.P.</p><p className="hero-sub">Fazer pelo Povo e pela Pátria.</p><a className="btn btn-light" href="#partido">Conhecer o partido <span>→</span></a></div><div className="hero-side-note"><span>COMPROMISSO INSTITUCIONAL</span><b>Angola</b><i>Participação · Dignidade · Responsabilidade</i></div></section>
      <section className="intro section" id="partido"><div className="wrap two-col"><div><div className="eyebrow dark">QUEM SOMOS</div><h2>Uma visão de país centrada na dignidade humana.</h2></div><div className="intro-copy"><p>O Partido Social Juntos Pelo Povo (S.J.P.P.) apresenta o projecto “Eco no Silêncio”, orientado por uma visão de Angola justa, unida e solidária, onde a dignidade humana, as oportunidades e a participação cidadã ocupam lugar central.</p><p>A sua missão institucional é defender os interesses dos cidadãos, com atenção às comunidades vulneráveis, promovendo o diálogo, a cidadania activa e políticas públicas assentes na justiça social, transparência e respeito pelos direitos humanos.</p></div></div></section>
      <section className="section institutional-pages" id="estrutura"><div className="wrap"><div className="section-heading"><div><div className="eyebrow dark">INFORMAÇÃO INSTITUCIONAL</div><h2>Conheça a organização</h2></div><p>Conteúdos institucionais disponibilizados e actualizados pela administração do portal.</p></div><div className="content-grid">{pages.length?pages.map(page=><article className="content-card" key={page.id}><div className="card-tag">INFORMAÇÃO OFICIAL</div><h3>{page.title}</h3><p>{page.summary||page.content}</p></article>):<div className="empty-state">Informações complementares serão publicadas nesta área pelos responsáveis do portal.</div>}</div></div></section>
      <section className="values"><div className="wrap values-grid"><div><span className="value-number">01</span><h3>Visão</h3><p>Uma Angola justa, unida e solidária, com dignidade, oportunidades e participação cidadã.</p></div><div><span className="value-number">02</span><h3>Missão</h3><p>Defender os interesses dos cidadãos e contribuir para respostas aos desafios sociais e económicos.</p></div><div><span className="value-number">03</span><h3>Valores</h3><p>Justiça social, dignidade humana, progresso sustentável, família, ética, transparência e responsabilidade pública.</p></div></div></section>
      <section className="section" id="programa"><div className="wrap"><div className="section-heading"><div><div className="eyebrow dark">LINHAS PROGRAMÁTICAS</div><h2>Áreas de compromisso público</h2></div><p>Oito eixos de referência para a organização do programa político e do debate público.</p></div><div className="pillar-grid">{pillars.map((p,i)=><article className="pillar" key={p[0]}><span>{String(i+1).padStart(2,'0')}</span><h3>{p[0]}</h3><p>{p[1]}</p></article>)}</div></div></section>
      <section className="quote-band"><div className="wrap"><p>“A Pátria e o Povo, chama por nós!”</p><span>Juntos Pelo Povo. Juntos por Angola.</span></div></section>
      <section className="section soft" id="noticias"><div className="wrap"><div className="section-heading"><div><div className="eyebrow dark">ACTUALIDADE</div><h2>Notícias e comunicados</h2></div><p>Informação institucional publicada pelos canais oficiais do partido.</p></div><div className="news-tools"><label htmlFor="news-search">Pesquisar publicações</label><input id="news-search" type="search" placeholder="Pesquisar por título ou conteúdo…" value={newsQuery} onChange={e=>setNewsQuery(e.target.value)}/></div><div className="content-grid">{loadingContent?<div className="empty-state">A carregar publicações…</div>:news.filter(x=>(x.title+' '+(x.excerpt||'')+' '+(x.content||'')).toLowerCase().includes(newsQuery.toLowerCase())).length?news.filter(x=>(x.title+' '+(x.excerpt||'')+' '+(x.content||'')).toLowerCase().includes(newsQuery.toLowerCase())).map(x=><article className="content-card news-card" key={x.id}>{x.cover_image_url&&<img className="news-cover" src={x.cover_image_url} alt="" loading="lazy"/>}<div className="card-tag">NOTÍCIA INSTITUCIONAL</div><h3>{x.title}</h3><p>{x.excerpt||x.content}</p><small>{x.published_at?new Date(x.published_at).toLocaleDateString('pt-PT'):''}</small></article>):<div className="empty-state">{news.length?'Nenhuma publicação corresponde à pesquisa.':'Ainda não existem notícias publicadas. Os comunicados oficiais serão apresentados nesta área.'}</div>}</div></div></section>
      <section className="section" id="agenda"><div className="wrap"><div className="eyebrow dark">PARTICIPAÇÃO INSTITUCIONAL</div><h2>Agenda</h2><div className="content-grid">{events.length?events.map(x=><article className="content-card" key={x.id}><div className="card-tag">{new Date(x.starts_at).toLocaleDateString('pt-PT')}</div><h3>{x.title}</h3><p>{x.description}</p><small>{x.venue||'Local a anunciar'}</small></article>):<div className="empty-state">Não existem eventos públicos agendados neste momento.</div>}</div></div></section>
      <section className="section soft" id="documentos"><div className="wrap"><div className="eyebrow dark">TRANSPARÊNCIA</div><h2>Documentos institucionais</h2><div className="documents">{docs.length?docs.map(d=><a className="document" key={d.id} href={d.file_url} target="_blank" rel="noreferrer"><span className="doc-icon">PDF</span><span><b>{d.title}</b><small>{d.description||d.category}</small></span><strong>↗</strong></a>):<div className="empty-state">Estatutos, regulamentos, programa e outros documentos serão disponibilizados nesta secção após publicação oficial.</div>}</div></div></section>
      <section className="section faq-section" id="perguntas-frequentes"><div className="wrap"><div className="section-heading"><div><div className="eyebrow dark">ESCLARECIMENTO PÚBLICO</div><h2>Perguntas frequentes</h2></div><p>Informações práticas sobre a consulta dos conteúdos e os canais institucionais do portal.</p></div><div className="faq-list"><details><summary>Onde encontro os documentos institucionais?</summary><p>Consulte a secção “Documentos institucionais”. Os ficheiros disponibilizados publicamente são apresentados com a respectiva descrição e ligação.</p></details><details><summary>Como posso acompanhar notícias e comunicados?</summary><p>A secção “Notícias e comunicados” apresenta as publicações disponibilizadas pela administração do portal. Pode utilizar a pesquisa para localizar conteúdos por título ou texto.</p></details><details><summary>Como consulto a agenda pública?</summary><p>Os eventos públicos publicados são apresentados na secção “Agenda”, com a data, a descrição e o local quando essas informações estiverem disponíveis.</p></details><details><summary>Para que serve o formulário de contacto?</summary><p>O formulário destina-se exclusivamente a pedidos de informação institucional geral. Não é um formulário de adesão, inscrição ou recolha de opiniões políticas. Consulte a Política de Privacidade antes de enviar uma mensagem.</p></details><details><summary>Como posso comunicar um problema de acessibilidade?</summary><p>Utilize os contactos institucionais indicados nesta página e descreva, sem incluir dados sensíveis, a dificuldade técnica encontrada no acesso ao portal.</p></details></div></div></section>
      <section className="section soft" id="participacao"><div className="wrap contact-grid"><div><div className="eyebrow dark">PARTICIPAÇÃO CIDADÃ</div><h2>Partilhe uma ideia para Angola.</h2><p className="intro-copy">Envie sugestões, contribuições para consultas públicas ou questões comunitárias. O formulário é anónimo: não pedimos nome, telefone, email, documento de identificação nem filiação política.</p><p className="muted">As contribuições poderão ser analisadas pela equipa institucional e utilizadas em sínteses agregadas, sem identificação dos participantes.</p></div><form className="contact-form" onSubmit={submitParticipation}><h3>Enviar contribuição</h3><label>Tipo de participação<select required value={participation.category} onChange={e=>setParticipation({...participation,category:e.target.value})}><option value="suggestion">Sugestão ou proposta</option><option value="public_consultation">Consulta pública</option><option value="community_issue">Questão comunitária</option></select></label><label>Tema<input required minLength="3" maxLength="120" value={participation.topic} onChange={e=>setParticipation({...participation,topic:e.target.value})} placeholder="Ex.: Educação, saúde, emprego"/></label><label>A sua contribuição<textarea required minLength="20" maxLength="3000" rows="6" value={participation.message} onChange={e=>setParticipation({...participation,message:e.target.value})} placeholder="Descreva a sua ideia ou preocupação, sem incluir dados pessoais ou informações sensíveis."/></label><p className="form-privacy-note">Não inclua nomes de terceiros, contactos, documentos, opiniões ou filiação política, dados de saúde, religião ou outras informações pessoais sensíveis.</p><button className="btn btn-primary" disabled={participationBusy}>{participationBusy?'A enviar…':'Enviar contribuição →'}</button>{participationNotice&&<p className="form-notice" role="status">{participationNotice}</p>}</form></div></section>
      <section className="section contact" id="contactos"><div className="wrap contact-grid"><div><div className="eyebrow">FALE CONNOSCO</div><h2>Contactos institucionais</h2><p>Para questões institucionais, pedidos de informação e comunicação geral, utilize os canais oficiais.</p><div className="contact-line"><small>EMAIL</small><a href="mailto:juntospelopovosjpp@gmail.com">juntospelopovosjpp@gmail.com</a></div><div className="contact-line"><small>TELEFONE</small><a href="tel:+244947152305">+244 947 152 305</a></div><div className="contact-line"><small>SEDE NACIONAL</small><span>Luanda, Município de Belas, Bairro Matadouro, Rua Principal, Casa n.º 119.</span></div></div><form className="contact-form" onSubmit={submit}><h3>Enviar mensagem</h3><p className="form-privacy-note">Canal destinado apenas a pedidos de informação institucional geral. Não é formulário de adesão ou inscrição. Não inclua opiniões ou filiação política, dados de saúde, religião ou outros dados sensíveis.</p><label>Nome completo<input required maxLength="120" value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})}/></label><div className="form-row"><label>Email<input type="email" maxLength="254" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Telefone<input type="tel" maxLength="40" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label></div><label>Assunto<input required maxLength="180" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}/></label><label>Mensagem<textarea required rows="4" maxLength="5000" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></label><label className="privacy-consent"><input type="checkbox" required checked={form.privacyConsent} onChange={e=>setForm({...form,privacyConsent:e.target.checked})}/> <span>Li e aceito a <a href="/privacidade" target="_blank" rel="noreferrer">Política de Privacidade</a>. Autorizo o tratamento dos dados fornecidos exclusivamente para responder a esta mensagem.</span></label><button className="btn btn-primary" disabled={sending}>{sending?'A enviar…':'Enviar mensagem →'}</button>{notice&&<p className="form-notice" role="status">{notice}</p>}</form></div></section>
    </main>
    <a className="whatsapp-float" href="https://wa.me/244947152305?text=Olá%2C%20gostaria%20de%20obter%20informações%20institucionais%20sobre%20o%20S.J.P.P." target="_blank" rel="noreferrer" aria-label="Contactar o S.J.P.P. pelo WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.02 3.2A12.7 12.7 0 0 0 5.1 22.38L3.3 28.9l6.68-1.75A12.7 12.7 0 1 0 16.02 3.2Zm0 23.1c-1.94 0-3.84-.52-5.5-1.5l-.4-.24-3.96 1.04 1.06-3.86-.26-.42a10.4 10.4 0 1 1 9.06 4.98Zm5.7-7.8c-.31-.16-1.84-.91-2.13-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-.99 1.23-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.13 3.03 1.29 3.24c.16.21 2.22 3.39 5.38 4.75.75.32 1.33.51 1.78.65.75.24 1.43.21 1.97.13.6-.09 1.84-.75 2.1-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.36Z"/></svg><span>WhatsApp</span></a>\n    <footer><div className="wrap footer-inner"><div><b>S.J.P.P. — JUNTOS PELO POVO</b><p>Eco no Silêncio · Fazer pelo Povo e pela Pátria.</p><nav className="footer-legal"><a href="/privacidade">Privacidade</a><a href="/termos">Termos de utilização</a><a href="/cookies">Cookies</a><a href="/acessibilidade">Acessibilidade</a></nav></div><span className="footer-national"><img className="angola-flag footer-flag" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" alt="Bandeira Nacional da República de Angola" width="36" height="24" loading="lazy" decoding="async"/>© {new Date().getFullYear()} S.J.P.P. · Informação institucional.</span></div></footer>
  </div>
}
const route=window.location.pathname.replace(/^\//,'').split('/')[0];
const legalTitles={privacidade:'Política de Privacidade',termos:'Termos de Utilização',cookies:'Política de Cookies',acessibilidade:'Declaração de Acessibilidade'};
if(route==='admin'){
  document.title='Área Restrita | S.J.P.P.';
  document.querySelector('meta[name="robots"]')?.setAttribute('content','noindex, nofollow');
}else if(legalTitles[route]){
  document.title=legalTitles[route]+' | S.J.P.P.';
}
const Root = route==='admin' ? <Admin/> : legalTitles[route] ? <Legal type={route}/> : <App/>;
createRoot(document.getElementById('root')).render(Root);