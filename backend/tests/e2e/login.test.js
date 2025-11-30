const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testLogin() {
  console.log('🚀 Iniciando teste E2E de Login...\n');

  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--disable-gpu');
  options.addArguments('--no-sandbox');

  let driver;

  try {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    console.log('✅ Navegador iniciado');

    await driver.get('http://localhost:5173/login');
    console.log('✅ Página de login carregada');

    await driver.wait(until.elementLocated(By.css('input[type="email"]')), 5000);
    
    const emailInput = await driver.findElement(By.css('input[type="email"]'));
    const passwordInput = await driver.findElement(By.css('input[type="password"]'));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    console.log('✅ Elementos do formulário encontrados');

    await emailInput.sendKeys('admin@ifrs.edu.br');
    await passwordInput.sendKeys('123456');
    console.log('✅ Credenciais preenchidas');

    await submitButton.click();
    console.log('✅ Botão de login clicado');

    await driver.wait(until.urlContains('dashboard'), 10000);
    
    const currentUrl = await driver.getCurrentUrl();
    console.log(`✅ Redirecionado para: ${currentUrl}`);

    if (currentUrl.includes('dashboard')) {
      console.log('\n✅ TESTE E2E PASSOU: Login realizado com sucesso!\n');
    } else {
      console.log('\n❌ TESTE E2E FALHOU: Não foi redirecionado para dashboard\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ ERRO NO TESTE E2E:', error.message);
    console.log('\n⚠️  Certifique-se de que:');
    console.log('   1. O backend está rodando em http://localhost:3000');
    console.log('   2. O frontend está rodando em http://localhost:5173');
    console.log('   3. O ChromeDriver está instalado\n');
    process.exit(1);
  } finally {
    if (driver) {
      await driver.quit();
      console.log('✅ Navegador fechado');
    }
  }
}

testLogin();
