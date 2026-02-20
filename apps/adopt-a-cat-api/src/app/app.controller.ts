import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cat } from '@felitech/shared-types';

@Controller()
export class AppController {
  private cats: Cat[] = [
    {
      // comment
      id: 0,
      name: 'Luna',
      imageUrl: 'https://i.ibb.co/qMbrLgHZ/luna.jpg',
      description:
        'Look at that blowout! Luna is the undisputed Queen of Fluff. Part panther, part cloud, she spends most of her time perfecting her poses for Instagram.',
      isFavorite: false,
      compatibility: {
        apartmentFriendly: 5,
        childFriendly: 2,
        calm: 4,
      },
    },
    {
      id: 1,
      name: 'Nyx',
      imageUrl: 'https://i.ibb.co/ZDDmWRs/nyx.png',
      description:
        'Nyx is a professional sun-chaser with a coat like polished velvet. Named after the goddess of night, she’s actually more of a golden-hour enthusiast. When she’s not busy glowing in the light, she’s plotting her next sprint across the living room.',
      isFavorite: false,
      compatibility: {
        apartmentFriendly: 5,
        childFriendly: 5,
        calm: 2,
      },
    },
    {
      id: 2,
      name: 'Linda',
      imageUrl: 'https://i.ibb.co/GftgBDcJ/linda.png',
      description:
        'TWhether she’s rocking a cotton-pad beret or showing off those stunning blue eyes, Linda is the definition of "extra." This elegant Siamese mix lives for the spotlight, luxury floral sofas, and making sure she\'s the center of attention at all times.',
      isFavorite: false,
      compatibility: {
        apartmentFriendly: 5,
        childFriendly: 1,
        calm: 1,
      },
    },
    {
      id: 3,
      name: 'Grizou',
      imageUrl: 'https://i.ibb.co/GQjmLCD5/grizou.jpg',
      description:
        'The ultimate cozy connoisseur. Grizou is a master of the "side-eye" and a professional blanket enthusiast. With his fluffy grey coat and permanent look of mild unimpressed judgment, he’s the perfect companion for a quiet night in—just don\'t expect him to share the duvet.',
      isFavorite: false,
      compatibility: {
        apartmentFriendly: 5,
        childFriendly: 4,
        calm: 5,
      },
    },
  ];

  @Get('cats')
  getData(): Cat[] {
    return this.cats;
  }

  @Get('cats/:id')
  getCat(@Param('id') id: string): Cat | undefined {
    return this.cats.find((cat) => cat.id === parseInt(id, 10));
  }

  @Post('cats/:id/favorite')
  toggleFavorite(@Param('id') id: string): Cat | undefined {
    const cat = this.cats.find((cat) => cat.id === parseInt(id, 10));
    if (cat) {
      cat.isFavorite = !cat.isFavorite;
    }
    return cat;
  }

  @Post('cats')
  createCat(
    @Body() cat: Omit<Cat, 'id' | 'isFavorite' | 'compatibility'>,
  ): Cat {
    const newCat: Cat = {
      ...cat,
      id:
        this.cats.length > 0 ? Math.max(...this.cats.map((c) => c.id)) + 1 : 0,
      isFavorite: false,
      compatibility: {
        apartmentFriendly: 3,
        childFriendly: 3,
        calm: 3,
      },
    };
    this.cats.push(newCat);
    return newCat;
  }
}
