import { NextResponse, NextRequest } from 'next/server';

import { auth } from '@/auth';
import { findOneRestaurant } from './src/actions/restaurant.actions';

export async function middleware(request: NextRequest) {
    const session = await auth();
    const { pathname } = request.nextUrl;

    // Si l'utilisateur n'est pas authentifié
    if (!session?.user) {
        // Redirige toutes les pages non authentifiées vers la page de connexion sauf la page d'accueil
        if (!pathname.startsWith('/auth')) {
            return NextResponse.redirect(new URL('/auth', request.url));
        }
    } else {
        const data = await findOneRestaurant();
        const restaurant = data?.restaurant;

        //   S'il n'a pas de restaurant
        if (!restaurant) {
            if (!pathname.startsWith('/create-restaurant')) {
                return NextResponse.redirect(new URL(`/create-restaurant`, request.url));
            }
        } else {
            //   S'il a un restaurant mais le restaurant n'a pas d'horaire
            if (restaurant.openingHours.length == 0) {
                if (!pathname.startsWith('/horaires')) {
                    return NextResponse.redirect(new URL('/horaires', request.url));
                }
            }
            
            else {
                if (restaurant.status < 2 || restaurant.status == 2) {
                    if (!pathname.startsWith('/activation-pending')) {
                        return NextResponse.redirect(new URL('/activation-pending', request.url));
                    }
                }

                if (restaurant?.pictures && restaurant?.pictures.length < 5) {
                    if (!pathname.startsWith('/add-pictures')) {
                        return NextResponse.redirect(new URL(`/add-pictures`, request.url));
                    }
                } else {
                    if (restaurant.status < 2) {
                        if (!pathname.startsWith('/activation-pending')) {
                            return NextResponse.redirect(new URL('/activation-pending', request.url));
                        }
                    }
                }
            }
        }
    }

    // Permet à la requête de continuer si aucune condition n'est remplie
    return NextResponse.next();
}

// Configuration des chemins à surveiller
export const config = {
    matcher: ['/', '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|auth|api/auth|auth/signout).*)'],
};
