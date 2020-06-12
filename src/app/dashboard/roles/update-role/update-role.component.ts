import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user';
import { RoleService } from 'src/app/services/role.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  userId:number;
  userForm:User;
  constructor(private activatedRoute:ActivatedRoute,
    private roleService:RoleService) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.queryParams.id;
    this.roleService.getUserById(this.userId).then(res=>this.userForm = res as User);
  }

}
