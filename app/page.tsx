import Hero from "@/components/hero"
import Specialties from "@/components/specialties"
import Stats from "@/components/stats"
import FeaturedContent from "@/components/featured-content"
import Newsletter from "@/components/newsletter"
import MrKuChat from "@/components/mr-ku-chat"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Specialties />
      <Stats />
      <FeaturedContent />
      <Newsletter />
      <MrKuChat />
      <Footer />
    </main>
  )
}
