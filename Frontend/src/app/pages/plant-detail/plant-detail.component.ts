import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailsComponent implements OnInit {
  plant: any; // To store fetched plant data
  comments: any[] = []; // To store comments
  newComment: { nom: string; email?: string; contenu: string } = {
    nom: '',
    email: '',
    contenu: ''
  };

  constructor(
    private plantService: PlantService,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      this.getPlantDetails(+plantId);
      this.getComments(+plantId);
    }
  }

  getPlantDetails(id: number): void {
    this.plantService.getPlantById(id).subscribe((data) => {
      this.plant = data;
    });
  }

  getComments(plantId: number): void {
    this.commentService.getCommentsByPlantId(plantId).subscribe((data) => {
      this.comments = data;
    });
  }

  addComment(): void {
    const plantId = this.plant.id;
    if (this.newComment.nom && this.newComment.contenu) {
      this.commentService.addComment(plantId, this.newComment).subscribe(() => {
        this.getComments(plantId);
        this.newComment = { nom: '', contenu: '' };
      });
    }
  }
}
