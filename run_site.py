import subprocess
import webbrowser
import time
import os

PORT = 6060
URL = f"http://127.0.0.1:{PORT}"
NGINX_CONF = "/data/data/com.termux/files/home/storage/shared/my_site/nginx.conf"

def run_command(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True)

def stop_nginx():
    print("🛑 Останавливаю nginx...")
    run_command("nginx -s stop")

def start_nginx():
    print("🔍 Проверяю конфиг nginx...")
    test = run_command(f"nginx -t -c {NGINX_CONF}")
    if "successful" not in test.stdout:
        print("❌ Ошибка в конфиге:")
        print(test.stdout or test.stderr)
        return False

    print("🚀 Запускаю nginx...")
    run_command(f"nginx -c {NGINX_CONF}")
    return True

def open_site():
    print("🌐 Открываю сайт:", URL)
    time.sleep(2)
    webbrowser.open(URL)

def main():
    stop_nginx()
    if start_nginx():
        open_site()
        print("✅ Сайт запущен:", URL)
    else:
        print("⚠️ Ошибка при запуске.")

if __name__ == "__main__":
    main()