import {createClient} from 'https://esm.sh/@supabase/supabase-js@2';
const supabase=createClient('https://ihaqpxqopekqeavnxrau.supabase.co','sb_publishable_5gOeq-Pg0BDFEDN43xKu5w_6KpHw-P4',{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const gate=document.getElementById('authGate'),shell=document.getElementById('shell'),error=document.getElementById('loginError');
let currentId=null,version=0;
async function display(session){
 const token=++version;
 if(!session){currentId=null;window.aristuDisconnect?.();shell.hidden=true;gate.hidden=false;return}
 if(currentId===session.user.id&&!shell.hidden)return;
 try{await window.aristuConnect(supabase);if(token!==version)return;currentId=session.user.id;document.getElementById('currentUser').textContent=session.user.email||'';gate.hidden=true;shell.hidden=false;error.textContent=''}
 catch(e){console.error(e);shell.hidden=true;gate.hidden=false;error.textContent='No se pueden cargar los datos: '+e.message}
}
document.getElementById('loginForm').addEventListener('submit',async e=>{e.preventDefault();error.textContent='Entrando…';const {error:err}=await supabase.auth.signInWithPassword({email:document.getElementById('loginEmail').value.trim(),password:document.getElementById('loginPassword').value});if(err)error.textContent='No se pudo iniciar sesión: '+err.message});
document.getElementById('logoutButton').addEventListener('click',async()=>{await supabase.auth.signOut()});
supabase.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_IN'||event==='SIGNED_OUT'||event==='INITIAL_SESSION')setTimeout(()=>display(session),0)});
