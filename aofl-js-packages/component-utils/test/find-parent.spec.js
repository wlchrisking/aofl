/* eslint-disable */
import {findParent} from '../modules/traverse-parents';
import {AoflElement} from '@aofl/web-components/aofl-element';
import {render, html} from 'lit-html';

describe('@aofl/component-utils', function() {
  context('findParent()', function() {
    before(function() {
      class ParentComp extends AoflElement {
        constructor() {
          super();
        }
        static get is() {
          return 'find-parent-parent-comp';
        }
        increment() {}
        render() {
          return super.render((context, html) => html`<slot></slot>`);
        }
      }

      class ChildComp extends AoflElement {
        constructor() {
          super();
        }
        static get is() {
          return 'find-parent-child-comp';
        }
        render() {
          return super.render((context, html) => html``);
        }
      }

      customElements.define(ParentComp.is, ParentComp);
      customElements.define(ChildComp.is, ChildComp);
    });

    beforeEach(function() {
      this.testContainer = getTestContainer();
      render(html`
        <find-parent-parent-comp>
          <find-parent-child-comp></find-parent-child-comp>
        </find-parent-parent-comp>
      `, this.testContainer);

      this.parentElement = this.testContainer.querySelector('find-parent-parent-comp');
      this.childElement = this.parentElement.querySelector('find-parent-child-comp');
    });

    afterEach(function() {
      cleanTestContainer(this.testContainer);
    });

    it('Should find the parent with specific functions', function () {
      expect(findParent(this.childElement, 'increment')).to.not.be.false;
    });

    it('Should not find parent with signature and throw error', function() {
      expect(findParent(this.childElement, 'not-found')).to.be.false;
    });
  });
});
