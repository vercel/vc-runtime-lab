import { ExposeRemoteComponent } from 'remote-components/remote/nextjs/app'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <ExposeRemoteComponent>
      <Footer />
    </ExposeRemoteComponent>
  )
}
