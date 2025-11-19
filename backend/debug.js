import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function diagnoseGoogleAPI() {
  console.log('🔍 GOOGLE API DIAGNOSTIC\n');
  
  // 1. Check API Key
  console.log('1. Checking API Key...');
  if (!process.env.GOOGLE_API_KEY) {
    console.log('❌ API Key: MISSING - Check your .env file');
    return;
  }
  console.log('✅ API Key: Present (starts with:', process.env.GOOGLE_API_KEY.substring(0, 10) + '...)');
  
  // 2. Test API Connection
  console.log('\n2. Testing API Connection...');
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    // Try to list available models first
    console.log('🤖 Attempting to list available models...');
    
    // Test with different model names
    const testModels = [
      'gemini-pro',
      'gemini-1.0-pro', 
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'models/gemini-pro'
    ];
    
    for (const modelName of testModels) {
      console.log(`\n   Testing model: ${modelName}`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say "Hello" in one word');
        const response = await result.response;
        console.log(`   ✅ SUCCESS: ${response.text()}`);
        console.log(`   🎯 USE THIS MODEL: ${modelName}`);
        break;
      } catch (modelError) {
        console.log(`   ❌ Failed: ${modelError.message.split('.')[0]}`);
      }
    }
    
  } catch (error) {
    console.log('❌ API Connection Failed:', error.message);
    console.log('\n🔧 Possible Solutions:');
    console.log('1. Check if Google Generative AI API is enabled:');
    console.log('   https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com');
    console.log('2. Regenerate API key');
    console.log('3. Check billing account');
  }
}

diagnoseGoogleAPI();