import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { GetServerSideProps } from 'next'

type Props = {
  user: User
}

export default function Page(props: Props) {
  return <main>Hello, {props.user.name}. Emailed at: {props.user.email}. Password is:{props.user.password}</main>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await prisma.user.findFirst({ select: { name: true, email: true, password: true }, where: { id: 1 } })

  return {
    props: {
      user
    }
  }
}
