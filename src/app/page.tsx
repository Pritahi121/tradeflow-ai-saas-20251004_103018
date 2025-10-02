export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
            <img
              src="/logo.svg"
              alt="Z.ai Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Auto-Deploy App
          </h1>
          <p className="text-gray-600">
            Next.js application with automatic Vercel deployments
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            🚀 Live Deployment with Vercel
          </h2>
          <p className="text-gray-600 mb-4">
            This application is set up for automatic deployments. When you push changes to the GitHub repository, Vercel will automatically update the live site.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">✅ Features</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Next.js 15 with App Router</li>
                <li>• TypeScript support</li>
                <li>• Tailwind CSS styling</li>
                <li>• Automatic Vercel deployments</li>
                <li>• Real-time updates</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🔄 Auto Updates</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Push to GitHub</li>
                <li>• Auto-deploy to Vercel</li>
                <li>• Live site updates</li>
                <li>• Zero downtime</li>
                <li>• Instant deployment</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">💡 How it works:</h3>
            <ol className="text-sm text-yellow-700 space-y-1">
              <li>1. Make changes to the code</li>
              <li>2. Commit and push to GitHub</li>
              <li>3. Vercel automatically detects changes</li>
              <li>4. Live site updates automatically</li>
            </ol>
          </div>
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">🎯 Current Status:</h3>
            <p className="text-sm text-purple-700">
              This app is ready for auto-deployment. Any changes pushed to the repository will be reflected live on the Vercel-hosted site.
            </p>
            <div className="mt-2 p-2 bg-green-100 rounded text-green-800 text-xs">
              ✅ Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}