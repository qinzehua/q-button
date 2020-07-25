import { expect } from 'chai';
import Row from '@/row-col/row';
import Col from '@/row-col/col';
import { mount } from '@vue/test-utils';

describe('Row Col', () => {
  it('存在', () => {
    expect(Row).to.exist;
  });

  it('接收 gutter 属性', async () => {
    const Component = {
      template:
        '<row gutter="20"><g-col span="12"></g-col><g-col span="12"></g-col></row>',
      components: {
        Row,
        GCol: Col
      }
    };

    const wrapper = await mount(Component);

    const rows = wrapper.find('.row').element;
    expect(rows.style.marginLeft).to.eq('-10px');
    expect(rows.style.marginRight).to.eq('-10px');
    const cols = wrapper.findAll('.col');
    expect(cols.at(0).element.style.paddingLeft).to.eq('10px');
    expect(cols.at(1).element.style.paddingRight).to.eq('10px');
  });
});
