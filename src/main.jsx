import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import './styles.css';

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
  const [events,setEvents] = useState([]);
  const [docs,setDocs] = useState([]);
  const [form,setForm] = useState({full_name:'',email:'',phone:'',subject:'',message:''});
  const [sending,setSending] = useState(false);
  const [notice,setNotice] = useState('');
  const [backend,setBackend] = useState('A carregar conteúdos…');

  useEffect(()=>{
    let active=true;
    async function load(){
      if(!supabase){setBackend('Modo institucional de demonstração — configure as variáveis Supabase para activar conteúdos dinâmicos.');return;}
      const [n,e,d] = await Promise.all([
        supabase.from('news_posts').select('id,title,slug,excerpt,content,published_at,cover_image_url').eq('status','published').order('published_at',{ascending:false}).limit(3),
        supabase.from('events').select('id,title,slug,description,venue,starts_at').eq('status','published').gte('starts_at',new Date().toISOString()).order('starts_at',{ascending:true}).limit(3),
        supabase.from('public_documents').select('id,title,description,file_url,category').eq('is_public',true).order('created_at',{ascending:false}).limit(8)
      ]);
      if(!active)return;
      if(!n.error)setNews(n.data||[]);
      if(!e.error)setEvents(e.data||[]);
      if(!d.error)setDocs(d.data||[]);
      setBackend('Conteúdos institucionais ligados à base de dados.');
    }
    load(); return ()=>{active=false};
  },[]);

  async function submit(e){
    e.preventDefault(); setNotice('');
    if(!form.full_name.trim()||!form.subject.trim()||form.message.trim().length<10){setNotice('Preencha o nome, assunto e uma mensagem com pelo menos 10 caracteres.');return;}
    if(!supabase){setNotice('O formulário está preparado. A ligação à base de dados será activada após configurar as variáveis Supabase.');return;}
    setSending(true);
    const {error}=await supabase.from('contact_messages').insert([{...form,status:'new'}]);
    setSending(false);
    if(error){setNotice('Não foi possível enviar agora. Tente novamente mais tarde.');return;}
    setForm({full_name:'',email:'',phone:'',subject:'',message:''});setNotice('Mensagem enviada. Obrigado pelo contacto.');
  }

  const closeMenu=()=>setMenuOpen(false);
  return <div>
    <div className="topline"><div className="wrap topline-inner"><span>Partido Social Juntos Pelo Povo — S.J.P.P.</span><span>Luanda, Angola · <a href="mailto:juntospelopovosjpp@gmail.com">juntospelopovosjpp@gmail.com</a></span></div></div>
    <header className="header"><div className="wrap nav">
      <a className="brand" href="#inicio" onClick={closeMenu}><span className="brand-mark">S.J.P.P.</span><span><b>JUNTOS PELO POVO</b><small>FAZER PELO POVO E PELA PÁTRIA</small></span></a>
      <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Abrir menu">☰</button>
      <nav className={menuOpen?'nav-links open':'nav-links'}>{[['Início','#inicio'],['O Partido','#partido'],['Programa','#programa'],['Notícias','#noticias'],['Agenda','#agenda'],['Documentos','#documentos'],['Contactos','#contactos']].map(([t,h])=><a key={h} href={h} onClick={closeMenu}>{t}</a>)}</nav>
    </div></header>
    <main>
      <section className="hero" id="inicio"><div className="wrap hero-content"><div className="eyebrow">PROJECTO ECO NO SILÊNCIO</div><h1>O silêncio termina.<br/><em>O trabalho começa.</em></h1><p>Partido Social Juntos Pelo Povo — S.J.P.P.</p><p className="hero-sub">Fazer pelo Povo e pela Pátria.</p><a className="btn btn-light" href="#partido">Conhecer o partido <span>→</span></a></div><div className="hero-stamp">ANGOLA<br/><b>2026</b></div></section>
      <section className="intro section" id="partido"><div className="wrap two-col"><div><div className="eyebrow dark">QUEM SOMOS</div><h2>Uma visão de país centrada na dignidade humana.</h2></div><div className="intro-copy"><p>O Partido Social Juntos Pelo Povo (S.J.P.P.) apresenta o projecto “Eco no Silêncio”, orientado por uma visão de Angola justa, unida e solidária, onde a dignidade humana, as oportunidades e a participação cidadã ocupam lugar central.</p><p>A sua missão institucional é defender os interesses dos cidadãos, com atenção às comunidades vulneráveis, promovendo o diálogo, a cidadania activa e políticas públicas assentes na justiça social, transparência e respeito pelos direitos humanos.</p></div></div></section>
      <section className="values"><div className="wrap values-grid"><div><span className="value-number">01</span><h3>Visão</h3><p>Uma Angola justa, unida e solidária, com dignidade, oportunidades e participação cidadã.</p></div><div><span className="value-number">02</span><h3>Missão</h3><p>Defender os interesses dos cidadãos e contribuir para respostas aos desafios sociais e económicos.</p></div><div><span className="value-number">03</span><h3>Valores</h3><p>Justiça social, dignidade humana, progresso sustentável, família, ética, transparência e responsabilidade pública.</p></div></div></section>
      <section className="section" id="programa"><div className="wrap"><div className="section-heading"><div><div className="eyebrow dark">LINHAS PROGRAMÁTICAS</div><h2>Áreas de compromisso público</h2></div><p>Oito eixos de referência para a organização do programa político e do debate público.</p></div><div className="pillar-grid">{pillars.map((p,i)=><article className="pillar" key={p[0]}><span>{String(i+1).padStart(2,'0')}</span><h3>{p[0]}</h3><p>{p[1]}</p></article>)}</div></div></section>
      <section className="quote-band"><div className="wrap"><p>“A Pátria e o Povo, chama por nós!”</p><span>Juntos Pelo Povo. Juntos por Angola.</span></div></section>
      <section className="section soft" id="noticias"><div className="wrap"><div className="section-heading"><div><div className="eyebrow dark">ACTUALIDADE</div><h2>Notícias e comunicados</h2></div><span className="muted">{backend}</span></div><div className="content-grid">{news.length?news.map(x=><article className="content-card" key={x.id}><div className="card-tag">COMUNICADO / NOTÍCIA</div><h3>{x.title}</h3><p>{x.excerpt||x.content}</p><small>{x.published_at?new Date(x.published_at).toLocaleDateString('pt-PT'):''}</small></article>):<div className="empty-state">Ainda não existem notícias publicadas. Os comunicados oficiais serão apresentados nesta área.</div>}</div></div></section>
      <section className="section" id="agenda"><div className="wrap"><div className="eyebrow dark">PARTICIPAÇÃO INSTITUCIONAL</div><h2>Agenda</h2><div className="content-grid">{events.length?events.map(x=><article className="content-card" key={x.id}><div className="card-tag">{new Date(x.starts_at).toLocaleDateString('pt-PT')}</div><h3>{x.title}</h3><p>{x.description}</p><small>{x.venue||'Local a anunciar'}</small></article>):<div className="empty-state">Não existem eventos públicos agendados neste momento.</div>}</div></div></section>
      <section className="section soft" id="documentos"><div className="wrap"><div className="eyebrow dark">TRANSPARÊNCIA</div><h2>Documentos institucionais</h2><div className="documents">{docs.length?docs.map(d=><a className="document" key={d.id} href={d.file_url} target="_blank" rel="noreferrer"><span className="doc-icon">PDF</span><span><b>{d.title}</b><small>{d.description||d.category}</small></span><strong>↗</strong></a>):<div className="empty-state">Estatutos, regulamentos, programa e outros documentos serão disponibilizados nesta secção após publicação oficial.</div>}</div></div></section>
      <section className="section contact" id="contactos"><div className="wrap contact-grid"><div><div className="eyebrow">FALE CONNOSCO</div><h2>Contactos institucionais</h2><p>Para questões institucionais, pedidos de informação e comunicação geral, utilize os canais oficiais.</p><div className="contact-line"><small>EMAIL</small><a href="mailto:juntospelopovosjpp@gmail.com">juntospelopovosjpp@gmail.com</a></div><div className="contact-line"><small>TELEFONE</small><a href="tel:+244947152305">+244 947 152 305</a></div><div className="contact-line"><small>SEDE NACIONAL</small><span>Luanda, Município de Belas, Bairro Matadouro, Rua Principal, Casa n.º 119.</span></div></div><form className="contact-form" onSubmit={submit}><h3>Enviar mensagem</h3><label>Nome completo<input required value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})}/></label><div className="form-row"><label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Telefone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label></div><label>Assunto<input required value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}/></label><label>Mensagem<textarea required rows="4" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></label><button className="btn btn-primary" disabled={sending}>{sending?'A enviar…':'Enviar mensagem →'}</button>{notice&&<p className="form-notice" role="status">{notice}</p>}</form></div></section>
    </main>
    <footer><div className="wrap footer-inner"><div><b>S.J.P.P. — JUNTOS PELO POVO</b><p>Eco no Silêncio · Fazer pelo Povo e pela Pátria.</p></div><span>© {new Date().getFullYear()} S.J.P.P. Todos os direitos reservados.</span></div></footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);