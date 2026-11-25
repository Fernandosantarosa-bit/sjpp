import React,{useEffect,useState} from 'react';
import {createClient} from '@supabase/supabase-js';
const supabase=createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_ANON_KEY);
const blank={title:'',evaluation_period:'',evaluation_date:new Date().toISOString().slice(0,10),scope:'',strengths:'',findings:'',recommendations:'',status:'draft'};
const statusLabel={draft:'Rascunho',in_review:'Em revisão',approved:'Aprovada',archived:'Arquivada'};
export default function InstitutionalEvaluations({session}){
 const [items,setItems]=useState([]),[form,setForm]=useState(blank),[editing,setEditing]=useState(null),[busy,setBusy]=useState(false),[notice,setNotice]=useState('');
 async function load(){const {data,error}=await supabase.from('institutional_evaluations').select('*').order('evaluation_date',{ascending:false}).order('created_at',{ascending:false});if(error)setNotice('Não foi possível carregar as avaliações institucionais.');else setItems(data||[]);}
 useEffect(()=>{load();},[]);
 function change(key,value){setForm(v=>({...v,[key]:value}));}
 async function save(e){e.preventDefault();setBusy(true);setNotice('');const payload={...form,created_by:session.user.id,updated_at:new Date().toISOString()};const result=editing?await supabase.from('institutional_evaluations').update({...payload,created_by:undefined}).eq('id',editing):await supabase.from('institutional_evaluations').insert([payload]);setBusy(false);if(result.error){setNotice('Não foi possível guardar. Confirme os campos e as permissões.');return;}setForm(blank);setEditing(null);setNotice(editing?'Avaliação actualizada.':'Avaliação registada com sucesso.');load();}
 function edit(item){setForm({title:item.title,evaluation_period:item.evaluation_period,evaluation_date:item.evaluation_date,scope:item.scope||'',strengths:item.strengths||'',findings:item.findings||'',recommendations:item.recommendations||'',status:item.status});setEditing(item.id);window.scrollTo({top:0,behavior:'smooth'});}
 async function remove(id){if(!window.confirm('Eliminar definitivamente esta avaliação?'))return;const {error}=await supabase.from('institutional_evaluations').delete().eq('id',id);setNotice(error?'Não foi possível eliminar a avaliação.':'Avaliação eliminada.');load();}
 async function setStatus(id,status){const {error}=await supabase.from('institutional_evaluations').update({status,updated_at:new Date().toISOString()}).eq('id',id);setNotice(error?'Não foi possível alterar o estado.':'Estado actualizado.');load();}
 return <section className="evaluation-panel">
  <form className="evaluation-editor" onSubmit={save}>
   <h2>{editing?'Editar avaliação':'Nova avaliação institucional'}</h2>
   <p>Registe avaliações administrativas e operacionais, documentando evidências, pontos fortes, constatações e recomendações de melhoria.</p>
   <label>Título da avaliação<input required minLength="3" maxLength="180" value={form.title} onChange={e=>change('title',e.target.value)} placeholder="Ex.: Avaliação do funcionamento institucional"/></label>
   <label>Período avaliado<input required maxLength="80" value={form.evaluation_period} onChange={e=>change('evaluation_period',e.target.value)} placeholder="Ex.: 1.º trimestre de 2027"/></label>
   <label>Data da avaliação<input required type="date" value={form.evaluation_date} onChange={e=>change('evaluation_date',e.target.value)}/></label>
   <label>Âmbito da avaliação<textarea value={form.scope} maxLength="4000" onChange={e=>change('scope',e.target.value)} placeholder="Descreva os processos, serviços ou actividades analisados."/></label>
   <label>Pontos fortes identificados<textarea value={form.strengths} maxLength="6000" onChange={e=>change('strengths',e.target.value)} placeholder="Registe práticas e resultados positivos observados."/></label>
   <label>Constatações e oportunidades de melhoria<textarea value={form.findings} maxLength="6000" onChange={e=>change('findings',e.target.value)} placeholder="Descreva factos observados e aspectos que necessitam de melhoria."/></label>
   <label>Recomendações e medidas correctivas<textarea value={form.recommendations} maxLength="6000" onChange={e=>change('recommendations',e.target.value)} placeholder="Indique medidas, prioridades e próximos passos."/></label>
   <label>Estado<select value={form.status} onChange={e=>change('status',e.target.value)}><option value="draft">Rascunho</option><option value="in_review">Em revisão</option><option value="approved">Aprovada</option><option value="archived">Arquivada</option></select></label>
   <div className="evaluation-actions"><button disabled={busy}>{busy?'A guardar…':editing?'Guardar alterações':'Registar avaliação'}</button>{editing&&<button type="button" className="evaluation-muted" onClick={()=>{setEditing(null);setForm(blank);}}>Cancelar</button>}</div>
   {notice&&<p role="status">{notice}</p>}
  </form>
  <div className="evaluation-list">
   <div className="evaluation-list-head"><div><h2>Histórico de avaliações</h2><span>{items.length} registo(s)</span></div><button type="button" className="evaluation-actions evaluation-muted" onClick={load}>Actualizar</button></div>
   {items.map(item=><article className="evaluation-item" key={item.id}><div><h3>{item.title}</h3><div className="evaluation-meta">{item.evaluation_period} · {new Date(item.evaluation_date+'T12:00:00').toLocaleDateString('pt-PT')}</div><p><b>Âmbito:</b> {item.scope||'Não especificado'}</p>{item.strengths&&<p><b>Pontos fortes:</b> {item.strengths}</p>}{item.findings&&<p><b>Constatações:</b> {item.findings}</p>}{item.recommendations&&<p><b>Recomendações:</b> {item.recommendations}</p>}<span className={'evaluation-status '+item.status}>{statusLabel[item.status]||item.status}</span></div><div className="evaluation-actions"><button type="button" className="evaluation-muted" onClick={()=>edit(item)}>Editar</button>{item.status!=='approved'&&<button type="button" onClick={()=>setStatus(item.id,'approved')}>Aprovar</button>}{item.status!=='archived'&&<button type="button" className="evaluation-muted" onClick={()=>setStatus(item.id,'archived')}>Arquivar</button>}<button type="button" className="evaluation-danger" onClick={()=>remove(item.id)}>Eliminar</button></div></article>)}
   {!items.length&&<p>Ainda não existem avaliações registadas. Utilize o formulário para criar a primeira.</p>}
  </div>
 </section>;
}
