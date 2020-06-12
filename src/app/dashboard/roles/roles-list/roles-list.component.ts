import { Component, OnInit } from '@angular/core';
import {RoleService} from '../../../services/role.service';
import {UserModel} from '../../../models/userModel';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
})
export class RolesListComponent implements OnInit {

  userList:UserModel[];
  constructor(private roleService:RoleService) { }

  ngOnInit(): void {
    this.roleService.getUsers().then(res=>this.userList = res as UserModel[]);
   
  }

}
