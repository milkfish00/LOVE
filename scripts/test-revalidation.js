#!/usr/bin/env node

/**
 * Test script for revalidation endpoints
 * Usage: node scripts/test-revalidation.js [secret]
 */

const secret = process.argv[2] || 'test-secret';
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function testRevalidation() {
  console.log('🧪 Testing revalidation endpoints...\n');

  const endpoints = [
    {
      name: 'Revalidate specific path',
      url: `${baseUrl}/api/revalidate`,
      body: { secret, path: '/' }
    },
    {
      name: 'Revalidate specific tag',
      url: `${baseUrl}/api/revalidate`,
      body: { secret, tag: 'dynamic' }
    },
    {
      name: 'Revalidate all pages',
      url: `${baseUrl}/api/revalidate`,
      body: { secret }
    }
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing: ${endpoint.name}`);
      
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(endpoint.body)
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log(`✅ Success:`, result);
      } else {
        console.log(`❌ Error:`, result);
      }
    } catch (error) {
      console.log(`❌ Network Error:`, error.message);
    }
    
    console.log(''); // Empty line for readability
  }

  // Test webhook endpoint
  try {
    console.log('Testing: Sanity webhook endpoint');
    
    const webhookResponse = await fetch(`${baseUrl}/api/webhooks/sanity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _type: 'home',
        _id: 'test-id'
      })
    });

    const webhookResult = await webhookResponse.json();
    
    if (webhookResponse.ok) {
      console.log(`✅ Webhook Success:`, webhookResult);
    } else {
      console.log(`❌ Webhook Error:`, webhookResult);
    }
  } catch (error) {
    console.log(`❌ Webhook Network Error:`, error.message);
  }
}

// Run the tests
testRevalidation().catch(console.error);


