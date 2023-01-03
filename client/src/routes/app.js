import { BooksInfo } from 'views/booksInfo';
import { Book } from 'views/book';
import { Dashboard } from 'views/dashboard/dashboard';
import { Help } from 'views/dashboard/help';
import { OnboardingView } from 'views/onboarding/onboarding';

const Routes = [
  {
    path: '/dashboard',
    view: Dashboard,
    layout: 'app',
    permission: 'user',
    title: 'Dashboard'
  },
  {
    path: '/welcome',
    view: OnboardingView,
    layout: 'onboarding',
    permission: 'user',
    title: 'Welcome'
  },
  {
    path: '/help',
    view: Help,
    layout: 'app',
    permission: 'user',
    title: 'Get Help'
  },
  {
    path: '/book',
    view: Book,
    layout: 'app',
    permission: 'user',
    title: 'Book'
  },
  {
    path: '/booksInfo',
    view: BooksInfo,
    layout: 'app',
    permission: 'user',
    title: 'BooksInfo'
  },
]

export default Routes;
