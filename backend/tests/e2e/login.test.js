const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testLogin() {
  console.log('🚀 Iniciando teste E2E de Login...\n');

  let driver;
  let timeout;

  try {
    timeout = setTimeout(() => {
      console.error('\n❌ TIMEOUT: Teste demorou mais de 20 segundos\n');
      process.exit(1);
    }, 20000);

    const service = new chrome.ServiceBuilder(
      require('chromedriver').path
    );
    
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeService(service)
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

    await driver.sleep(2000);
    
    await driver.wait(until.urlContains('dashboard'), 10000);
    
    const currentUrl = await driver.getCurrentUrl();
    console.log(`✅ Redirecionado para: ${currentUrl}`);
    console.log('\n✅ TESTE E2E PASSOU: Login realizado com sucesso!\n');

  } catch (error) {
    console.error('\n❌ ERRO NO TESTE E2E:', error.message);
    if (error.message.includes('ChromeDriver')) {
      console.log('\n⚠️  Problema com ChromeDriver. Tente:');
      console.log('   npm install chromedriver --save-dev\n');
    } else {
      console.log('\n⚠️  Certifique-se de que:');
      console.log('   1. O backend está rodando em http://localhost:3000');
      console.log('   2. O frontend está rodando em http://localhost:5173\n');
    }
    process.exit(1);
  } finally {
    if (timeout) clearTimeout(timeout);
    if (driver) {
      await driver.quit();
      console.log('✅ Navegador fechado');
    }
  }
}

testLogin().catch(err => {
  console.error('❌ Erro fatal:', err.message);
  process.exit(1);
});
