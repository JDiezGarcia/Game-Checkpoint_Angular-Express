import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { UserService } from '../core';

@Directive({ selector: '[appRoleAuthed]' })
export class ShowRoleDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  condition!: string;

  ngOnInit() {
    this.userService.currentRole.subscribe(
      (role) => {
        if (role === this.condition || role === 'admin') {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  @Input() set appRoleAuthed(condition: string) {
    this.condition = condition;
  }

}
