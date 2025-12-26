import React from 'react'

export default function page() {
  return (
    <div>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                   <h1 className="text-3xl font-bold mb-6 ml-80 text-gray-900 text-left">Help</h1>
               <div><p className="text-base leading-6 mb-4 text-gray-600 text-left">
            Welcome to the Instagram Help Center. Here you can find answers to 
            commonly asked questions and learn how to solve issues you may face 
            while using Instagram.
          </p></div>
          <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">Getting Started</h2>
                </div>
                
                  <p className="text-base leading-6 mb-3 text-gray-600 -ml-53">
            Learn how to create an account, set up your profile, and start using Instagram.
          </p>
          <ul className="list-disc -ml-115 space-y-2 text-base leading-6 text-gray-600">
            <li>How to create a new account</li>
            <li>Setting up your username and profile</li>
            <li>Logging in and logging out safely</li>
          </ul>
               <div>
                <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900 -ml-95">Managing Your Account</h2>
               </div>
               <p className="text-base leading-6 mb-3 text-gray-600 -ml-120">
            Keep your account safe and up to date.
          </p>
          <ul className="list-disc -ml-110 space-y-2 text-base leading-6 text-gray-600 ">
            <li>Resetting your password</li>
            <li>Updating your email or mobile number</li>
            <li>Deleting or deactivating your account</li>
          </ul>
          <div>
            <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900 -ml-95">Using Instagram</h2>
            </div>
            <p className="text-base leading-6 mb-3 text-gray-600 -ml-105">
            Learn how to post, share, connect, and explore.
          </p>
          <ul className="list-disc space-y-2 text-base leading-6 text-gray-600 -ml-98">
            <li>Uploading photos and videos</li>
            <li>Sharing stories and reels</li>
            <li>Sending messages and starting conversations</li>
            <li>Discovering new accounts</li>
          </ul>
          <div>
            <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900 -ml-95">Troubleshooting</h2>
          </div>
          <p className="text-base leading-6 mb-3 text-gray-600 -ml-105">
            If something isn’t working, these tips may help.
          </p>
          <ul className="list-disc -ml-115 space-y-2 text-base leading-6 text-gray-600">
            <li>Fix login issues</li>
            <li>App not loading or crashing</li>
            <li>Problems with photo/video upload</li>
            <li>Messages not sending</li>
          </ul>
          <div>
            <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900 -ml-94">Contact Support</h2>

          </div>
          <p className="text-base leading-6 text-gray-600 -ml-74">
            Still need help? Contact us anytime at{" "}
            <span className="font-medium">support@instagram.com</span>.
          </p>

            </div>
    </div>
  )
}
