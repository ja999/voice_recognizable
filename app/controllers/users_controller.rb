class UsersController < ActionController::Base
  layout 'application'

  def new
    @user = User.new
  end

  def create
    if User.create(user_params)
      redirect_to root_path, :notice => 'User created.'
    else
      redirect_to root_path, :notice => 'User not created.'
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
