import BottomNav from '@/components/bottom-nav'
import Header from '@/components/header'
import RightPanel from '@/components/right-panel'
import SidebarNav from '@/components/sidebar-nav'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <SidebarNav />
      <RightPanel />
      <div className="flex flex-col md:pl-[220px] xl:pr-[280px]">
        <Header />
        <main className="flex-1 w-full max-w-2xl mx-auto px-4 pt-4 pb-24 md:pb-8">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
