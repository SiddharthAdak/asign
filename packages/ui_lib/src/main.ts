import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
  VNode
} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

interface State {
  count: number;
}

type TemplateFunction = (state: State) => VNode;

let state: State = { count: 0 };

const updateState = (newState: Partial<State>): void => {
  state = { ...state, ...newState };
  updateView();
};

const updateView = (): void => {
  const newVnode = template(state);
  patch(oldVnode, newVnode);
  oldVnode = newVnode;
};

let oldVnode: VNode = document.getElementById('app') as VNode;

const useEffect = (callback: () => void): void => {
  callback();
};

const template: TemplateFunction = (props) => {
  useEffect(() => {
    console.log('Component mounted!');
  });

  return h('div', [
    h('h1', `Count: ${props.count}`),
    h('button', 
    { 
      style: { fontSize: "16px", color: "white", cursor: "pointer",padding: "6px 20px", borderRadius: "8px", border: "0px", backgroundColor: "#e54c44" },
      on: { click: () => updateState({ count: state.count + 1 }) } 
    }, 
    'Add'),
  ]);
};

updateView();
