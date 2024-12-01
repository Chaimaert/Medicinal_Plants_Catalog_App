import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from '../../models/plant.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  // Static plant data
  plants: Plant[] = [
    {
      id: 1, 
      name: 'Aloe Vera',
      image: 'assets/Aloe_vera.jpg',
      description: 'Aloe Vera is a succulent plant species of the genus Aloe.',
      properties: ['Anti-inflammatory', 'Antioxidant'],
      uses: ['Used for skin care', 'Wound healing'],
      precautions: ['Avoid applying to open wounds.'],
      comments: ['Great for skin!', 'I use it every day!'],
      region: ['Maroc'],
      interactions: ['May interact with certain medications.'],
      articles: ['https://example.com/aloe-vera-article1', 'https://example.com/aloe-vera-article2'],
      video: ['https://example.com/aloe-vera-video1', 'https://example.com/aloe-vera-video2']
    },
    {
      id: 2, 
      name: 'Mint', 
      image: 'assets/mint.jpg',
      description: 'Mint is a group of plants in the genus Mentha.',
      properties: ['Digestive aid', 'Cooling sensation'],
      uses: ['Used for tea', 'Relieves headaches'],
      precautions: ['May cause heartburn in some individuals.'],
      comments: ['Love the smell!', 'Great for tea!'],
      region: ['Maroc'],
      interactions: ['Can interact with certain digestive medications.'],
      articles: ['https://example.com/mint-article1', 'https://example.com/mint-article2'],
      video: ['https://example.com/mint-video1', 'https://example.com/mint-video2']
    },
    {
      id: 3, 
      name: 'Lavender', 
      image: 'assets/lavendar.jpg',
      description: 'Lavender is a genus of 47 known species of flowering plants.',
      properties: ['Relaxing', 'Calming'],
      uses: ['Used for relaxation', 'Aromatherapy'],
      precautions: ['Avoid excessive use near eyes.'],
      comments: ['Perfect for stress relief', 'Great fragrance!'],
      region: ['Provence'],
      interactions: ['May interact with sedative drugs.'],
      articles: ['https://example.com/lavender-article1', 'https://example.com/lavender-article2'],
      video: ['https://example.com/lavender-video1', 'https://example.com/lavender-video2']
    },
    {
      id: 4, 
      name: 'chamomile', 
      image: 'assets/chamomile.jpg',
      description: 'Lavender is a genus of 47 known species of flowering plants.',
      properties: ['Relaxing', 'Calming'],
      uses: ['Used for relaxation', 'Aromatherapy'],
      precautions: ['Avoid excessive use near eyes.'],
      comments: ['Perfect for stress relief', 'Great fragrance!'],
      region:  ['Provence'],
      interactions: ['May interact with sedative drugs.'],
      articles: ['https://example.com/lavender-article1', 'https://example.com/lavender-article2'],
      video: ['https://example.com/lavender-video1', 'https://example.com/lavender-video2']
    },
    {
      id: 5, 
      name: 'Ashwaganda',
      image: 'assets/ashwaganda.jpg',
      description: 'Aloe Vera is a succulent plant species of the genus Aloe.',
      properties: ['Anti-inflammatory', 'Antioxidant'],
      uses: ['Used for skin care', 'Wound healing'],
      precautions: ['Avoid applying to open wounds.'],
      comments: ['Great for skin!', 'I use it every day!'],
      region:  ['Maroc'],
      interactions: ['May interact with certain medications.'],
      articles: ['https://example.com/aloe-vera-article1', 'https://example.com/aloe-vera-article2'],
      video: ['https://example.com/aloe-vera-video1', 'https://example.com/aloe-vera-video2']
    },
    {
      id: 6, 
      name: 'Tumeric', 
      image: 'assets/tumeric.jpg',
      description: 'Mint is a group of plants in the genus Mentha.',
      properties: ['Digestive aid', 'Cooling sensation'],
      uses: ['Used for tea', 'Relieves headaches'],
      precautions: ['May cause heartburn in some individuals.'],
      comments: ['Love the smell!', 'Great for tea!'],
      region:  ['Maroc'],
      interactions: ['Can interact with certain digestive medications.'],
      articles: ['https://example.com/mint-article1', 'https://example.com/mint-article2'],
      video: ['https://example.com/mint-video1', 'https://example.com/mint-video2']
    },
    {
      id: 7, 
      name: 'Calendula', 
      image: 'assets/calendula.jpg',
      description: 'Lavender is a genus of 47 known species of flowering plants.',
      properties: ['Relaxing', 'Calming'],
      uses: ['Used for relaxation', 'Aromatherapy'],
      precautions: ['Avoid excessive use near eyes.'],
      comments: ['Perfect for stress relief', 'Great fragrance!'],
      region:  ['Provence'],
      interactions: ['May interact with sedative drugs.'],
      articles: ['https://example.com/lavender-article1', 'https://example.com/lavender-article2'],
      video: ['https://example.com/lavender-video1', 'https://example.com/lavender-video2']
    },
    {
      id: 8, 
      name: 'Rosemary', 
      image: 'assets/roseamry.jpg',
      description: 'Lavender is a genus of 47 known species of flowering plants.',
      properties: ['Relaxing', 'Calming'],
      uses: ['Used for relaxation', 'Aromatherapy'],
      precautions: ['Avoid excessive use near eyes.'],
      comments: ['Perfect for stress relief', 'Great fragrance!'],
      region:  ['Provence'],
      interactions: ['May interact with sedative drugs.'],
      articles: ['https://example.com/lavender-article1', 'https://example.com/lavender-article2'],
      video: ['https://example.com/lavender-video1', 'https://example.com/lavender-video2']
    },
    {
      id: 9, 
      name: 'Aloe Vera',
      image: 'assets/plant1.jpg',
      description: 'Aloe Vera is a succulent plant species of the genus Aloe.',
      properties: ['Anti-inflammatory', 'Antioxidant'],
      uses: ['Used for skin care', 'Wound healing'],
      precautions: ['Avoid applying to open wounds.'],
      comments: ['Great for skin!', 'I use it every day!'],
      region:  ['Maroc'],
      interactions: ['May interact with certain medications.'],
      articles: ['https://example.com/aloe-vera-article1', 'https://example.com/aloe-vera-article2'],
      video: ['https://example.com/aloe-vera-video1', 'https://example.com/aloe-vera-video2']
    },
    {
      id: 10, 
      name: 'Mint', 
      image: 'assets/plant4.jpg',
      description: 'Mint is a group of plants in the genus Mentha.',
      properties: ['Digestive aid', 'Cooling sensation'],
      uses: ['Used for tea', 'Relieves headaches'],
      precautions: ['May cause heartburn in some individuals.'],
      comments: ['Love the smell!', 'Great for tea!'],
      region:  ['Maroc'],
      interactions: ['Can interact with certain digestive medications.'],
      articles: ['https://example.com/mint-article1', 'https://example.com/mint-article2'],
      video: ['https://example.com/mint-video1', 'https://example.com/mint-video2']
    },
    {
      id: 11, 
      name: 'Lavender', 
      image: 'assets/plant5.jpg',
      description: 'Lavender is a genus of 47 known species of flowering plants.',
      properties: ['Relaxing', 'Calming'],
      uses: ['Used for relaxation', 'Aromatherapy'],
      precautions: ['Avoid excessive use near eyes.'],
      comments: ['Perfect for stress relief', 'Great fragrance!'],
      region:  ['Provence'],
      interactions: ['May interact with sedative drugs.'],
      articles: ['https://example.com/lavender-article1', 'https://example.com/lavender-article2'],
      video: ['https://example.com/lavender-video1', 'https://example.com/lavender-video2']
    },
    
  ];

  // Static plant list for testing advanced search
  staticPlants: Plant[] = [
    new Plant(
      1,
      'Lavande',
      'Lavender is a genus of 47 known species of flowering plants.',
      'assets/plant4.jpg',
      ['Avoid excessive use near eyes.'],
      ['Perfect for stress relief', 'Great fragrance!'],
      ['Provence'],
      ['Relaxing', 'Calming'],
      ['Used for relaxation', 'Aromatherapy'],
      ['May interact with sedative drugs.'],
      ['https://example.com/lavender-article1'],
      ['https://example.com/lavender-video1']
    ),
    new Plant(
      2,
      'Camomille',
      'Chamomile is an herb known for its calming and anti-inflammatory properties.',
      'assets/plant4.jpg',
      ['No particular precautions'],
      ['Helps with digestion'],
      ['Europe'],
      ['Anti-inflammatory', 'Relaxing'],
      ['Used for tea', 'Helps with sleep'],
      ['Can interact with blood thinners'],
      ['https://example.com/camomile-article1'],
      ['https://example.com/camomile-video1']
    ),
    new Plant(
      3,
      'Menthe',
      'Mint is a group of plants in the genus Mentha.',
      'assets/plant4.jpg',
      ['Can cause burning sensations'],
      ['Aids in digestion'],
      ['Asia'],
      ['Digestive aid', 'Cooling sensation'],
      ['Used for tea', 'Relieves headaches'],
      ['Can interact with certain digestive medications.'],
      ['https://example.com/mint-article1'],
      ['https://example.com/mint-video1']
    )
  ];

  searchLetter: string = '';
  properties: string = '';
  uses: string = '';
  region: string = '';
  filteredPlants: Plant[] = [];
  plantResult: Plant | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filteredPlants = this.plants;
  }

  filterByLetter(letter: string): void {
    console.log('Filtering by letter:', letter);
  
    // If no letter is entered, reset to the original plant list
    if (!letter) {
      this.filteredPlants = [...this.plants];
    } else {
      this.filteredPlants = this.plants.filter(plant =>
        plant.name.toLowerCase().startsWith(letter.toLowerCase())
      );
    }
  
    console.log('Filtered Plants:', this.filteredPlants);  // Debugging output
    this.currentPage = 1;  // Reset pagination to first page
  }
  

  // Perform Advanced Search
 

  // Navigate to details
  viewPlantDetails(plantId: number): void {
    this.router.navigate([`/plant-details`, plantId]);
  }

  // Pagination
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredPlants.length) {
      this.currentPage++;
    }
  }

  getPaginatedPlants(): Plant[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log('Paginated Plants:', this.filteredPlants.slice(startIndex, endIndex));  // Debugging output
    return this.filteredPlants.slice(startIndex, endIndex);
  }
  
}
