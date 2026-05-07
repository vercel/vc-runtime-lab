import { ExposeRemoteComponent } from 'remote-components/remote/nextjs/app'
import Header from '@/components/Header'

export default function Page() {
  return (
    <ExposeRemoteComponent>
      <Header />
    </ExposeRemoteComponent>
  )
}
