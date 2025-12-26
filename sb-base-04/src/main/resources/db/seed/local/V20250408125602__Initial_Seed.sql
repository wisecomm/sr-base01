-- 기본 역할 생성
INSERT INTO BS_ROLE (ROLE_NAME, DESCRIPTION) VALUES 
('ROLE_ADMIN', '시스템 관리자'),
('ROLE_MANAGER', '매니저'),
('ROLE_USER', '일반 사용자');

-- 메인 메뉴 그룹
INSERT INTO BS_MENU (MENU_NAME, MENU_URL, PARENT_ID, MENU_ORDER, MENU_ICON, MENU_TYPE) VALUES
('대시보드', '/dashboard', NULL, 1, 'dashboard', 'M'),
('시스템 관리', NULL, NULL, 99, 'settings', 'G');

-- 시스템 관리 하위 메뉴
INSERT INTO BS_MENU (MENU_NAME, MENU_URL, PARENT_ID, MENU_ORDER, MENU_ICON, MENU_TYPE) VALUES
('사용자 관리', '/admin/users', 2, 1, 'people', 'M'),
('역할 관리', '/admin/roles', 2, 2, 'security', 'M'),
('메뉴 관리', '/admin/menus', 2, 3, 'menu', 'M');

-- 관리자 역할에 모든 메뉴 권한 부여
INSERT INTO BS_ROLE_MENU (ROLE_ID, MENU_ID, CREATE_PERM, READ_PERM, UPDATE_PERM, DELETE_PERM)
SELECT 1, MENU_ID, TRUE, TRUE, TRUE, TRUE FROM BS_MENU;

-- 매니저 역할에 일부 메뉴 권한 부여
INSERT INTO BS_ROLE_MENU (ROLE_ID, MENU_ID, CREATE_PERM, READ_PERM, UPDATE_PERM, DELETE_PERM)
SELECT 2, MENU_ID, 
  CASE WHEN MENU_NAME = '사용자 관리' THEN FALSE ELSE TRUE END, 
  TRUE, 
  CASE WHEN MENU_NAME = '사용자 관리' THEN FALSE ELSE TRUE END, 
  FALSE 
FROM BS_MENU;

-- 일반 사용자 역할에 제한된 메뉴 권한 부여
INSERT INTO BS_ROLE_MENU (ROLE_ID, MENU_ID, READ_PERM)
VALUES (3, 1, TRUE); -- 대시보드만 열람 가능
