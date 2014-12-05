Rails.application.routes.draw do
  root 'pages#home'
  get 'login', to: 'pages#login'
  resources :users do
    post :login_user, on: :collection
  end
end
