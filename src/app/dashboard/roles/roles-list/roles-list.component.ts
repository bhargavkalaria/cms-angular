import { Component, OnInit } from '@angular/core';
import {RoleService} from '../../../services/role.service';
import {User} from '../../../models/user';
@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  userList:User[];
  constructor(private roleService:RoleService) { }

  ngOnInit(): void {
    this.roleService.getUsers().then(res=>this.userList = res as User[]);
   
  }

}
