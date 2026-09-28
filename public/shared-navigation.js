/* Shared navigation for the HTML pages and the React pages. */
(() => {
  if (document.getElementById('dmdap-sidebar')) return;
  const brand = document.createElement('div');
  brand.id = 'dmdap-brand';
  brand.innerHTML = `<button type="button" aria-label="메뉴 열기" aria-haspopup="dialog" aria-controls="dmdap-sidebar" aria-expanded="false"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 10H27M5 22H27" /></svg></button><a href="/flow/onboarding.html" aria-label="처음 시작 화면"><img src="/shared-logo.png" alt="당문당답" /></a>`;
  const sidebar = document.createElement('dialog');
  sidebar.id = 'dmdap-sidebar';
  sidebar.setAttribute('aria-label', '전체 메뉴');
  sidebar.innerHTML = `<div class="dmdap-sidebar-content"><button class="dmdap-close" type="button" aria-label="메뉴 닫기" autofocus><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 10H27M5 22H27" /></svg></button><nav aria-label="주요 메뉴"><a href="/flow/index.html">상담하기</a><a href="/?page=glucose">혈당 관리</a><a href="/flow/careguide.html">케어 가이드</a><a href="/?page=community">커뮤니티</a></nav><button class="dmdap-settings" type="button" aria-label="설정" disabled><svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.08-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.3 7.3 0 0 0-1.69-.98L14.48 2.42A.49.49 0 0 0 14 2h-4a.49.49 0 0 0-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.49.49 0 0 0-.61.22l-2 3.46a.49.49 0 0 0 .12.64l2.11 1.65c-.05.32-.09.66-.09.98s.03.66.08.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46c.12.22.38.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.24.42.49.42h4c.25 0 .45-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.1-1.65ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
        />
      </svg></button></div>`;
  const dashboard = document.createElement('a');
  dashboard.id = 'dmdap-dashboard-link';
  dashboard.href = '/?page=glucose';
  dashboard.setAttribute('aria-label', '혈당 관리로 이동');
  dashboard.innerHTML = '<img src="/dashboard.png" alt="" />';
  document.body.append(brand, dashboard, sidebar);
  const opener = brand.querySelector('button');
  opener.addEventListener('click', () => {
    sidebar.showModal();
    document.body.classList.add('dmdap-menu-open');
    opener.setAttribute('aria-expanded', 'true');
  });
  sidebar.querySelector('.dmdap-close').addEventListener('click', () => sidebar.close());
  sidebar.addEventListener('click', event => {
    if (event.target !== sidebar) return;
    const r = sidebar.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) sidebar.close();
  });
  sidebar.addEventListener('close', () => {
    document.body.classList.remove('dmdap-menu-open');
    opener.setAttribute('aria-expanded', 'false');
    opener.focus({preventScroll: true});
  });
  sidebar.querySelector('nav a').addEventListener('click', event => {
    if (location.pathname !== '/flow/index.html') return;
    event.preventDefault();
    sidebar.close();
    document.querySelector('.experts-scroll')?.scrollIntoView({behavior: 'smooth', block: 'center'});
  });
})();
