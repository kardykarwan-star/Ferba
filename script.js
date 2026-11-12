const themeToggle = document.getElementById('themeToggle');
const searchToggle = document.getElementById('searchToggle');
const searchPanel = document.getElementById('searchPanel');
const searchInput = document.getElementById('siteSearch');
const searchMessage = document.getElementById('searchMessage');

if (localStorage.getItem('feerba-theme') === 'dark') document.body.classList.add('dark');
function updateThemeLabel(){
  if(!themeToggle) return;
  const dark = document.body.classList.contains('dark');
  themeToggle.querySelector('span').textContent = dark ? 'ڕووناک مۆد' : 'دارک مۆد';
  themeToggle.setAttribute('aria-label', dark ? 'گۆڕین بۆ دۆخی ڕووناک' : 'گۆڕین بۆ دۆخی تاریک');
}
updateThemeLabel();
themeToggle?.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  localStorage.setItem('feerba-theme',document.body.classList.contains('dark')?'dark':'light');
  updateThemeLabel();
});
searchToggle?.addEventListener('click',()=>{
  searchPanel.hidden = !searchPanel.hidden;
  if(!searchPanel.hidden) searchInput.focus();
});
function runSearch(){
  const term=(searchInput.value||'').trim();
  if(!term){searchMessage.textContent='تکایە وشەیەک بنووسە بۆ گەڕان.';return;}
  const links=[...document.querySelectorAll('.category-card')];
  const found=links.find(link=>link.innerText.includes(term));
  if(found){searchMessage.textContent='بەشی پەیوەندیدار دۆزرایەوە؛ دەچیتە پەڕەکە.';setTimeout(()=>location.href=found.href,450);}
  else searchMessage.textContent='ئەم بابەتە لەم وەشانەدا نەدۆزرایەوە. تکایە وشەیەکی تر تاقی بکەرەوە.';
}
document.getElementById('searchSubmit')?.addEventListener('click',runSearch);
searchInput?.addEventListener('keydown',e=>{if(e.key==='Enter')runSearch();});
