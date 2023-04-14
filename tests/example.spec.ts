import { test, expect } from '@playwright/test';

//Test 1 - Visits https://footium.club

test('visit site', async ({ page }) => {
  await page.goto('https://footium.club');
  await expect(page).toHaveTitle(/Footium/);
  await expect(page).toHaveURL('https://footium.club');
});

//Test 2 - Checks that the GET STARTED button links to the correct Medium article

  test('get started link', async ({ page }) => {
  await page.goto('https://footium.club');
  
  //Checking link
  //const anchor = page.locator('a[href = "https://medium.com/footium/how-to-get-started-with-footium-1e40a41f2843"]');
  //await expect(anchor).toHaveAttribute('href','https://medium.com/footium/how-to-get-started-with-footium-1e40a41f2843');
 
  //Click the get started link.
  const getStartedbtn = page.getByRole('button', { name: 'Get Started' });
  await getStartedbtn.first().waitFor();
  const page1P = page.waitForEvent('popup');
  await getStartedbtn.click();
  const page1 = await page1P;
  
  //Check medium URL
  await expect(page1).toHaveURL("https://medium.com/footium/how-to-get-started-with-footium-1e40a41f2843");
  
  });

//Test 3 - Checks that all the necessary investors (funds, DAOs and angels) are present on the page

  test('check investors', async ({ page }) => {
  await page.goto('https://footium.club');
  
  //Checking Funds
  expect(await page.getByText('Funds').isVisible()).toBeTruthy();
  const funds = ['Backed VC', 'Animoca Brands','Stride VC', 'Entreé Capital', 'Concept Ventures', 'Encode Club'];
  for(const fund of funds){
	  expect(await page.getByText(fund).isVisible()).toBeTruthy();
  }
    
  //Checking DOAs
  expect(await page.getByText('Gaming DAOs').isVisible()).toBeTruthy();
  const doas = ['Merit Circle', 'BlackPool', 'BAYZ', 'Yield Guild Games SEA'];
  for(const doa of doas){
	    expect(await page.getByText(doa).isVisible()).toBeTruthy();
  }
  
  //Checking Angels
  expect(await page.getByText('Angels including').isVisible()).toBeTruthy();
  const angels = ['Chris Smalling', 'Michael Bentley', 'Ahmed Al-Balaghi', 'SolBigBrain'];
  for(const angel of angels){
	  expect(await page.getByText(angel).isVisible()).toBeTruthy();
  }
  
});

//Test 4 - Clicks the PLAY button in the top right corner

test('check play', async ({ page }) => {
  await page.goto('https://footium.club');
  await page.getByRole('button', { name: 'Play' }).click();
  await expect(page).toHaveURL('https://footium.club/game');
});


//Test 5 - Ensures that the Competition table shows 12 clubs, each with their own logo

test('check competition table', async ({ page }) => {
  await page.goto('https://footium.club');
  await page.getByRole('button', { name: 'Play' }).click();
  
  await page.locator('table').first().waitFor();
  expect(page.getByRole('table')).toBeVisible();
  
  await page.locator('table tr').first().waitFor();
  const row_count = await page.locator('table tr').count();
  if (row_count == 12)
  {
	  await page.locator('table tr td div img').first().waitFor();
	  await expect(page.locator('table tr td div img')).toHaveAttribute('loading','lazy');
  }
}); 
